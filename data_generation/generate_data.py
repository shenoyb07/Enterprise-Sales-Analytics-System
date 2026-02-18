
import pandas as pd
import numpy as np
import random
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Configuration
NUM_CUSTOMERS = 5000
NUM_PRODUCTS = 100
NUM_SALES_REPS = 50
NUM_ORDERS = 50000

# Lists for random data
REGIONS = ['North', 'South', 'East', 'West', 'Central']
SEGMENTS = ['Consumer', 'Corporate', 'Home Office']
CATEGORIES = {
    'Furniture': ['Chairs', 'Tables', 'Bookcases', 'Furnishings'],
    'Office Supplies': ['Labels', 'Art', 'Phones', 'Binders', 'Appliances', 'Paper', 'Accessories', 'Storage', 'Fasteners', 'Envelopes'],
    'Technology': ['Phones', 'Accessories', 'Machines', 'Copiers']
}
STATUSES = ['Pending', 'Shipped', 'Delivered', 'Cancelled']
DISCOUNT_LEVELS = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30]

print("Starting Data Generation...")

# 1. Generate Regions
regions_data = []
for i, region in enumerate(REGIONS, 1):
    regions_data.append({
        'region_id': i,
        'region_name': region,
        'manager_name': fake.name()
    })
df_regions = pd.DataFrame(regions_data)

# 2. Generate Sales Reps
sales_reps_data = []
for i in range(1, NUM_SALES_REPS + 1):
    sales_reps_data.append({
        'rep_id': i,
        'first_name': fake.first_name(),
        'last_name': fake.last_name(),
        'email': fake.email(),
        'region_id': random.choice(regions_data)['region_id'],
        'hire_date': fake.date_between(start_date='-5y', end_date='today'),
        'base_salary': random.randint(40000, 120000)
    })
df_sales_reps = pd.DataFrame(sales_reps_data)

# 3. Generate Products
products_data = []
product_categories_flat = []
for cat, subcats in CATEGORIES.items():
    for subcat in subcats:
        product_categories_flat.append((cat, subcat))

for i in range(1, NUM_PRODUCTS + 1):
    cat, subcat = random.choice(product_categories_flat)
    unit_cost = round(random.uniform(10, 500), 2)
    # Price is Cost + Margin (20% - 150%)
    margin = random.uniform(0.2, 1.5)
    unit_price = round(unit_cost * (1 + margin), 2)
    
    products_data.append({
        'product_id': i,
        'product_name': f"{subcat} - {fake.word().capitalize()} {fake.random_int(min=100, max=999)}", # Fake product names
        'category': cat,
        'sub_category': subcat,
        'unit_cost': unit_cost,
        'unit_price': unit_price,
        'launch_date': fake.date_between(start_date='-3y', end_date='-1y')
    })
df_products = pd.DataFrame(products_data)

# 4. Generate Customers
customers_data = []
for _ in range(NUM_CUSTOMERS):
    customers_data.append({
        'customer_id': fake.uuid4(),
        'company_name': fake.company() if random.choice([True, False]) else None, # B2B or B2C
        'contact_name': fake.name(),
        'email': fake.email(),
        'segment': random.choice(SEGMENTS),
        'city': fake.city(),
        'state': fake.state(),
        'country': 'United States', # Simplify for now
        'region_id': random.choice(regions_data)['region_id'],
        'signup_date': fake.date_between(start_date='-3y', end_date='today')
    })
df_customers = pd.DataFrame(customers_data)

# 5. Generate Orders
orders_data = []
start_date = datetime.now() - timedelta(days=365*2) # 2 years of data
end_date = datetime.now()

for _ in range(NUM_ORDERS):
    order_date = fake.date_time_between(start_date=start_date, end_date=end_date)
    customer = random.choice(customers_data)
    
    orders_data.append({
        'order_id': fake.uuid4(),
        'order_date': order_date,
        'customer_id': customer['customer_id'],
        'rep_id': random.choice(sales_reps_data)['rep_id'], # Ideally match region but let's assume cross-region sales happen
        'region_id': customer['region_id'],
        'status': random.choices(STATUSES, weights=[0.1, 0.1, 0.75, 0.05])[0],
        'shipping_cost': round(random.uniform(5, 50), 2),
        'discount_applied': random.choice([True, False])
    })
df_orders = pd.DataFrame(orders_data)

# 6. Generate Order Items
order_items_data = []
for order in orders_data:
    num_items = random.randint(1, 5) # 1 to 5 items per order
    order_products = random.sample(products_data, num_items)
    
    for product in order_products:
        quantity = random.randint(1, 10)
        # Apply discount logic
        discount_percent = 0
        if order['discount_applied']:
            discount_percent = random.choice(DISCOUNT_LEVELS) * 100
            
        unit_price = product['unit_price']
        unit_cost = product['unit_cost']
        
        # Calculate derived fields for CSV (though DB will calculate them too, useful for preview)
        revenue = quantity * unit_price * (1 - discount_percent/100)
        cost = quantity * unit_cost
        profit = revenue - cost
        
        order_items_data.append({
            'item_id': fake.uuid4(),
            'order_id': order['order_id'],
            'product_id': product['product_id'],
            'quantity': quantity,
            'unit_price_at_sale': unit_price,
            'unit_cost_at_sale': unit_cost,
            'discount_percent': discount_percent,
            'total_revenue': round(revenue, 2),
            'total_cost': round(cost, 2),
            'profit': round(profit, 2)
        })

df_order_items = pd.DataFrame(order_items_data)

# Export to CSVs
print("Exporting to CSV...")
df_regions.to_csv('regions.csv', index=False)
df_sales_reps.to_csv('sales_reps.csv', index=False)
df_products.to_csv('products.csv', index=False)
df_customers.to_csv('customers.csv', index=False)
df_orders.to_csv('sales_orders.csv', index=False)
df_order_items.to_csv('order_items.csv', index=False)

print("Data Generation Complete.")
print(f"Generated {len(df_orders)} orders and {len(df_order_items)} line items.")
