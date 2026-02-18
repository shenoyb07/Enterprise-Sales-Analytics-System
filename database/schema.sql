-- Enterprise Sales Analytics System - Database Schema
-- Author: Enterprise Sales Analytics System (Portfolio)

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Regions Table
CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    region_name VARCHAR(50) NOT NULL UNIQUE,
    manager_name VARCHAR(100)
);

-- 2. Sales Reps Table
CREATE TABLE sales_reps (
    rep_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    region_id INT REFERENCES regions(region_id),
    hire_date DATE NOT NULL,
    base_salary DECIMAL(10, 2)
);

-- 3. Products Table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50),
    unit_cost DECIMAL(10, 2) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    launch_date DATE
);

-- 4. Customers Table (SaaS/B2B context usually has Companies, but let's stick to standard retail/B2B hybrid for broad appeal)
CREATE TABLE customers (
    customer_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_name VARCHAR(100),
    contact_name VARCHAR(100),
    email VARCHAR(100),
    segment VARCHAR(50) CHECK (segment IN ('Consumer', 'Corporate', 'Home Office')),
    city VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50),
    region_id INT REFERENCES regions(region_id),
    signup_date DATE
);

-- 5. Sales Orders Table
CREATE TABLE sales_orders (
    order_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id UUID REFERENCES customers(customer_id),
    rep_id INT REFERENCES sales_reps(rep_id),
    region_id INT REFERENCES regions(region_id),
    status VARCHAR(20) CHECK (status IN ('Pending', 'Shipped', 'Delivered', 'Cancelled')),
    shipping_cost DECIMAL(10, 2) DEFAULT 0.00,
    discount_applied BOOLEAN DEFAULT FALSE
);

-- 6. Order Items Table (Granular Sales Data)
CREATE TABLE order_items (
    item_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES sales_orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT CHECK (quantity > 0),
    unit_price_at_sale DECIMAL(10, 2) NOT NULL, -- capturing price at time of sale
    unit_cost_at_sale DECIMAL(10, 2) NOT NULL,  -- capturing cost at time of sale for accurate margin
    discount_percent DECIMAL(5, 2) DEFAULT 0.00 CHECK (discount_percent BETWEEN 0 AND 100),
    total_revenue DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * unit_price_at_sale * (1 - discount_percent/100)) STORED,
    total_cost DECIMAL(12, 2) GENERATED ALWAYS AS (quantity * unit_cost_at_sale) STORED,
    profit DECIMAL(12, 2) GENERATED ALWAYS AS ((quantity * unit_price_at_sale * (1 - discount_percent/100)) - (quantity * unit_cost_at_sale)) STORED
);

-- Indexes for Performance Optimization
CREATE INDEX idx_orders_date ON sales_orders(order_date);
CREATE INDEX idx_orders_customer ON sales_orders(customer_id);
CREATE INDEX idx_items_order ON order_items(order_id);
CREATE INDEX idx_items_product ON order_items(product_id);
