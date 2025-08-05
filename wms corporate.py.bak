import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import numpy as np

# Page configuration
st.set_page_config(
    page_title="SupplyChain Pro",
    page_icon="🚛",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        color: #1f2937;
        text-align: center;
        margin-bottom: 2rem;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
    }
    
    .metric-card {
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        color: white;
    }
    
    .status-in-stock { background-color: #10b981; }
    .status-low-stock { background-color: #f59e0b; }
    .status-out-of-stock { background-color: #ef4444; }
    .status-in-transit { background-color: #3b82f6; }
    .status-delivered { background-color: #10b981; }
    .status-planning { background-color: #6b7280; }
    
    .sidebar .sidebar-content {
        background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'inventory_data' not in st.session_state:
    st.session_state.inventory_data = pd.DataFrame({
        'SKU': ['SKU001', 'SKU002', 'SKU003', 'SKU004', 'SKU005'],
        'Product Name': ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
        'Quantity': [150, 25, 0, 300, 75],
        'Location': ['WH-01-A-01', 'WH-01-B-02', 'WH-02-A-01', 'WH-01-C-01', 'WH-02-B-01'],
        'Reorder Point': [50, 30, 20, 100, 40],
        'Unit Price': [1200, 850, 950, 2100, 1500],
        'Status': ['In Stock', 'Low Stock', 'Out of Stock', 'In Stock', 'In Stock']
    })

if 'shipments_data' not in st.session_state:
    st.session_state.shipments_data = pd.DataFrame({
        'Shipment ID': ['SH001', 'SH002', 'SH003', 'SH004', 'SH005'],
        'Origin': ['Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Delhi'],
        'Destination': ['Delhi', 'Chennai', 'Hyderabad', 'Kolkata', 'Mumbai'],
        'Driver': ['Raj Kumar', 'Suresh Nair', 'Amit Singh', 'Vikram Sharma', 'Ravi Patel'],
        'Vehicle': ['MH12AB1234', 'KA03CD5678', 'MH14EF9012', 'TN09GH3456', 'DL07IJ7890'],
        'Status': ['In Transit', 'Delivered', 'Planning', 'In Transit', 'Delivered'],
        'ETA': ['2024-08-06', '2024-08-05', '2024-08-07', '2024-08-06', '2024-08-05'],
        'Progress': [65, 100, 15, 80, 100]
    })

if 'orders_data' not in st.session_state:
    st.session_state.orders_data = pd.DataFrame({
        'Order ID': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005'],
        'Customer': ['ABC Corp', 'XYZ Ltd', 'PQR Industries', 'LMN Enterprises', 'DEF Solutions'],
        'Items': [15, 8, 22, 12, 18],
        'Value': [125000, 75000, 180000, 95000, 145000],
        'Status': ['Processing', 'Shipped', 'Pending', 'Processing', 'Delivered'],
        'Date': ['2024-08-05', '2024-08-04', '2024-08-05', '2024-08-06', '2024-08-03']
    })

# Sidebar navigation
st.sidebar.markdown("# 🚛 SupplyChain Pro")
st.sidebar.markdown("---")

page = st.sidebar.selectbox(
    "Navigate to:",
    ["📊 Dashboard", "📦 Warehouse Management", "🚛 Transportation", "🏢 ERP", "📈 Analytics"]
)

# Helper functions
def get_status_badge(status):
    status_classes = {
        'In Stock': 'status-in-stock',
        'Low Stock': 'status-low-stock',
        'Out of Stock': 'status-out-of-stock',
        'In Transit': 'status-in-transit',
        'Delivered': 'status-delivered',
        'Planning': 'status-planning',
        'Processing': 'status-in-transit',
        'Shipped': 'status-delivered',
        'Pending': 'status-low-stock'
    }
    class_name = status_classes.get(status, 'status-planning')
    return f'<span class="status-badge {class_name}">{status}</span>'

def create_gauge_chart(value, title, max_val=100):
    fig = go.Figure(go.Indicator(
        mode = "gauge+number+delta",
        value = value,
        domain = {'x': [0, 1], 'y': [0, 1]},
        title = {'text': title},
        delta = {'reference': max_val * 0.8},
        gauge = {
            'axis': {'range': [None, max_val]},
            'bar': {'color': "darkblue"},
            'steps': [
                {'range': [0, max_val * 0.5], 'color': "lightgray"},
                {'range': [max_val * 0.5, max_val * 0.8], 'color': "gray"}
            ],
            'threshold': {
                'line': {'color': "red", 'width': 4},
                'thickness': 0.75,
                'value': max_val * 0.9
            }
        }
    ))
    fig.update_layout(height=300)
    return fig

# Dashboard Page
if page == "📊 Dashboard":
    st.markdown('<h1 class="main-header">📊 Dashboard Overview</h1>', unsafe_allow_html=True)
    
    # KPI Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        total_inventory_value = (st.session_state.inventory_data['Quantity'] * 
                               st.session_state.inventory_data['Unit Price']).sum()
        st.metric(
            label="📦 Total Inventory Value",
            value=f"₹{total_inventory_value/100000:.1f}M",
            delta="12% from last month"
        )
    
    with col2:
        active_shipments = len(st.session_state.shipments_data[
            st.session_state.shipments_data['Status'].isin(['In Transit', 'Planning'])
        ])
        st.metric(
            label="🚛 Active Shipments",
            value=active_shipments,
            delta="-3% from last week"
        )
    
    with col3:
        total_orders = len(st.session_state.orders_data)
        st.metric(
            label="📋 Total Orders",
            value=total_orders,
            delta="8% from yesterday"
        )
    
    with col4:
        total_revenue = st.session_state.orders_data['Value'].sum()
        st.metric(
            label="💰 Revenue MTD",
            value=f"₹{total_revenue/100000:.1f}M",
            delta="15% from last month"
        )
    
    st.markdown("---")
    
    # Charts Row
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Inventory Status Distribution")
        status_counts = st.session_state.inventory_data['Status'].value_counts()
        fig_pie = px.pie(
            values=status_counts.values,
            names=status_counts.index,
            color_discrete_map={
                'In Stock': '#10b981',
                'Low Stock': '#f59e0b',
                'Out of Stock': '#ef4444'
            }
        )
        fig_pie.update_layout(height=350)
        st.plotly_chart(fig_pie, use_container_width=True)
    
    with col2:
        st.subheader("🚛 Shipment Progress")
        fig_bar = px.bar(
            st.session_state.shipments_data,
            x='Shipment ID',
            y='Progress',
            color='Status',
            color_discrete_map={
                'In Transit': '#3b82f6',
                'Delivered': '#10b981',
                'Planning': '#6b7280'
            }
        )
        fig_bar.update_layout(height=350)
        st.plotly_chart(fig_bar, use_container_width=True)
    
    # Recent Activity
    st.subheader("🔔 Recent Activity & Alerts")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### Recent Orders")
        recent_orders = st.session_state.orders_data.head(3)
        for _, order in recent_orders.iterrows():
            with st.container():
                st.markdown(f"""
                <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1rem; margin: 0.5rem 0;">
                    <strong>{order['Order ID']}</strong> - {order['Customer']}<br>
                    <span style="color: #6b7280;">₹{order['Value']:,}</span> 
                    {get_status_badge(order['Status'])}
                </div>
                """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("### System Alerts")
        alerts = [
            ("🚨", "Low Stock Alert", "Product B is below reorder point", "error"),
            ("⏰", "Shipment Delay", "SH001 delayed by 2 hours", "warning"),
            ("✅", "Delivery Completed", "SH002 delivered successfully", "success")
        ]
        
        for icon, title, message, alert_type in alerts:
            color = {"error": "#fef2f2", "warning": "#fffbeb", "success": "#f0fdf4"}[alert_type]
            st.markdown(f"""
            <div style="background: {color}; border-radius: 0.5rem; padding: 1rem; margin: 0.5rem 0;">
                {icon} <strong>{title}</strong><br>
                <span style="color: #6b7280;">{message}</span>
            </div>
            """, unsafe_allow_html=True)

# Warehouse Management Page
elif page == "📦 Warehouse Management":
    st.markdown('<h1 class="main-header">📦 Warehouse Management System</h1>', unsafe_allow_html=True)
    
    # Action buttons
    col1, col2, col3 = st.columns([2, 1, 1])
    with col1:
        search_term = st.text_input("🔍 Search products...", "")
    with col2:
        if st.button("➕ Add Product", type="primary"):
            st.success("Add Product dialog would open here")
    with col3:
        if st.button("📤 Export Data"):
            st.success("Data exported successfully!")
    
    # Filter data based on search
    filtered_data = st.session_state.inventory_data
    if search_term:
        filtered_data = filtered_data[
            filtered_data['Product Name'].str.contains(search_term, case=False) |
            filtered_data['SKU'].str.contains(search_term, case=False)
        ]
    
    # Inventory table with custom styling
    st.subheader("📋 Inventory Overview")
    
    # Create a styled dataframe
    df_display = filtered_data.copy()
    df_display['Total Value'] = df_display['Quantity'] * df_display['Unit Price']
    df_display['Status HTML'] = df_display['Status'].apply(get_status_badge)
    
    # Display metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total SKUs", len(filtered_data))
    with col2:
        st.metric("Low Stock Items", len(filtered_data[filtered_data['Status'] == 'Low Stock']))
    with col3:
        st.metric("Out of Stock", len(filtered_data[filtered_data['Status'] == 'Out of Stock']))
    with col4:
        total_value = (filtered_data['Quantity'] * filtered_data['Unit Price']).sum()
        st.metric("Total Value", f"₹{total_value/100000:.1f}M")
    
    # Enhanced table display
    st.markdown("### Detailed Inventory")
    
    # Create columns for better layout
    for _, row in df_display.iterrows():
        with st.container():
            col1, col2, col3, col4, col5 = st.columns([2, 1, 1, 1, 1])
            with col1:
                st.markdown(f"**{row['Product Name']}**")
                st.caption(f"SKU: {row['SKU']}")
            with col2:
                st.markdown(f"Qty: **{row['Quantity']}**")
                st.caption(f"Reorder: {row['Reorder Point']}")
            with col3:
                st.markdown(f"**{row['Location']}**")
            with col4:
                st.markdown(f"₹{row['Unit Price']:,}")
            with col5:
                st.markdown(get_status_badge(row['Status']), unsafe_allow_html=True)
                if st.button(f"📝 Edit", key=f"edit_{row['SKU']}"):
                    st.info(f"Edit dialog for {row['Product Name']}")
        st.markdown("---")

# Transportation Management Page
elif page == "🚛 Transportation":
    st.markdown('<h1 class="main-header">🚛 Transportation Management System</h1>', unsafe_allow_html=True)
    
    # Quick stats
    col1, col2, col3 = st.columns(3)
    with col1:
        active_routes = len(st.session_state.shipments_data[
            st.session_state.shipments_data['Status'] != 'Delivered'
        ])
        st.metric("🛣️ Active Routes", active_routes)
    
    with col2:
        on_time_delivery = 94
        st.metric("⏰ On-Time Delivery", f"{on_time_delivery}%")
    
    with col3:
        fleet_utilization = 87
        st.metric("🚛 Fleet Utilization", f"{fleet_utilization}%")
    
    # Shipment tracking map (placeholder)
    st.subheader("🗺️ Live Shipment Tracking")
    
    # Create a sample map with shipment locations
    map_data = pd.DataFrame({
        'lat': [19.0760, 12.9716, 18.5204, 13.0827, 28.7041],
        'lon': [72.8777, 77.5946, 73.8567, 80.2707, 77.1025],
        'city': ['Mumbai', 'Bangalore', 'Pune', 'Chennai', 'Delhi'],
        'shipments': [3, 2, 1, 2, 1]
    })
    
    st.map(map_data[['lat', 'lon']], size='shipments')
    
    # Shipments table
    st.subheader("📋 Active Shipments")
    
    if st.button("🆕 New Shipment", type="primary"):
        st.success("New shipment creation dialog would open here")
    
    # Display shipments with enhanced UI
    for _, shipment in st.session_state.shipments_data.iterrows():
        with st.container():
            col1, col2, col3, col4, col5 = st.columns([1, 2, 1, 1, 1])
            
            with col1:
                st.markdown(f"**{shipment['Shipment ID']}**")
            
            with col2:
                st.markdown(f"📍 {shipment['Origin']} → {shipment['Destination']}")
                st.caption(f"Driver: {shipment['Driver']}")
            
            with col3:
                st.markdown(f"🚛 {shipment['Vehicle']}")
            
            with col4:
                st.markdown(f"📅 {shipment['ETA']}")
                if shipment['Status'] == 'In Transit':
                    progress_bar = st.progress(shipment['Progress']/100)
                    st.caption(f"{shipment['Progress']}% complete")
            
            with col5:
                st.markdown(get_status_badge(shipment['Status']), unsafe_allow_html=True)
                if st.button("🔍 Track", key=f"track_{shipment['Shipment ID']}"):
                    st.info(f"Tracking details for {shipment['Shipment ID']}")
        
        st.markdown("---")

# ERP Page
elif page == "🏢 ERP":
    st.markdown('<h1 class="main-header">🏢 Enterprise Resource Planning</h1>', unsafe_allow_html=True)
    
    # ERP modules
    st.subheader("📊 ERP Modules Overview")
    
    modules = [
        ("💰", "Financial Management", "Accounting, invoicing, payments", "₹45.2M", "Total Revenue YTD"),
        ("👥", "Human Resources", "Employee management, payroll", "1,247", "Active Employees"),
        ("🛒", "Procurement", "Purchase orders, supplier mgmt", "₹12.8M", "Monthly Procurement"),
        ("📈", "Sales & CRM", "Customer relationships, sales", "2,847", "Active Customers"),
        ("🏭", "Asset Management", "Equipment, maintenance", "₹8.9M", "Asset Value"),
        ("📋", "Project Management", "Projects, tasks, resources", "47", "Active Projects")
    ]
    
    col1, col2, col3 = st.columns(3)
    
    for i, (icon, title, desc, value, metric) in enumerate(modules):
        with [col1, col2, col3][i % 3]:
            with st.container():
                st.markdown(f"""
                <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 1.5rem; margin: 0.5rem 0; background: white;">
                    <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                        <span style="font-size: 2rem; margin-right: 1rem;">{icon}</span>
                        <div>
                            <h3 style="margin: 0; font-size: 1.1rem;">{title}</h3>
                            <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">{desc}</p>
                        </div>
                    </div>
                    <div>
                        <p style="font-size: 1.5rem; font-weight: bold; margin: 0;">{value}</p>
                        <p style="color: #6b7280; font-size: 0.8rem; margin: 0;">{metric}</p>
                    </div>
                </div>
                """, unsafe_allow_html=True)
                
                if st.button(f"Open {title}", key=f"erp_{i}"):
                    st.success(f"{title} module would open here")
    
    # Recent transactions
    st.subheader("💳 Recent Transactions")
    
    transactions = [
        ("Payment", "₹2,50,000", "Supplier payment - ABC Materials", "2024-08-05", "Completed"),
        ("Invoice", "₹1,75,000", "Sales invoice - XYZ Corp", "2024-08-05", "Pending"),
        ("Purchase", "₹85,000", "Raw materials procurement", "2024-08-04", "Completed")
    ]
    
    for trans_type, amount, desc, date, status in transactions:
        with st.container():
            col1, col2, col3 = st.columns([2, 1, 1])
            with col1:
                st.markdown(f"**{trans_type}**: {desc}")
            with col2:
                st.markdown(f"**{amount}**")
            with col3:
                st.markdown(f"{get_status_badge(status)} {date}", unsafe_allow_html=True)
        st.markdown("---")

# Analytics Page
elif page == "📈 Analytics":
    st.markdown('<h1 class="main-header">📈 Analytics & Reports</h1>', unsafe_allow_html=True)
    
    # KPI Dashboard
    col1, col2, col3 = st.columns(3)
    
    with col1:
        fig_gauge1 = create_gauge_chart(94, "Order Fulfillment Rate (%)")
        st.plotly_chart(fig_gauge1, use_container_width=True)
    
    with col2:
        fig_gauge2 = create_gauge_chart(87, "Fleet Utilization (%)")
        st.plotly_chart(fig_gauge2, use_container_width=True)
    
    with col3:
        fig_gauge3 = create_gauge_chart(76, "Inventory Accuracy (%)")
        st.plotly_chart(fig_gauge3, use_container_width=True)
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📦 Inventory Turnover Trends")
        dates = pd.date_range(start='2024-01-01', end='2024-08-01', freq='M')
        turnover_data = pd.DataFrame({
            'Month': dates,
            'Turnover_Ratio': np.random.uniform(2.0, 4.0, len(dates))
        })
        
        fig_line = px.line(turnover_data, x='Month', y='Turnover_Ratio', 
                          title="Monthly Inventory Turnover")
        st.plotly_chart(fig_line, use_container_width=True)
    
    with col2:
        st.subheader("🚛 Delivery Performance")
        delivery_data = pd.DataFrame({
            'Week': [f'Week {i}' for i in range(1, 9)],
            'On_Time': np.random.uniform(85, 98, 8),
            'Delayed': np.random.uniform(2, 15, 8)
        })
        
        fig_bar = px.bar(delivery_data, x='Week', y=['On_Time', 'Delayed'],
                        title="Weekly Delivery Performance")
        st.plotly_chart(fig_bar, use_container_width=True)
    
    # Performance metrics
    st.subheader("🎯 Key Performance Indicators")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div style="text-align: center; padding: 2rem; background: #dbeafe; border-radius: 0.5rem;">
            <h2 style="color: #1d4ed8; margin: 0;">94%</h2>
            <p style="color: #1e40af; margin: 0;">Order Fulfillment Rate</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="text-align: center; padding: 2rem; background: #dcfce7; border-radius: 0.5rem;">
            <h2 style="color: #16a34a; margin: 0;">2.4</h2>
            <p style="color: #15803d; margin: 0;">Inventory Turnover Ratio</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="text-align: center; padding: 2rem; background: #f3e8ff; border-radius: 0.5rem;">
            <h2 style="color: #9333ea; margin: 0;">18%</h2>
            <p style="color: #7c3aed; margin: 0;">Cost Reduction YoY</p>
        </div>
        """, unsafe_allow_html=True)

# Footer
st.sidebar.markdown("---")
st.sidebar.markdown("### 🔧 Quick Actions")
if st.sidebar.button("🔄 Refresh Data"):
    st.cache_data.clear()
    st.success("Data refreshed!")

if st.sidebar.button("📱 Mobile View"):
    st.info("Mobile view would be optimized here")

if st.sidebar.button("⚙️ Settings"):
    st.info("Settings panel would open here")

st.sidebar.markdown("---")
st.sidebar.markdown("**SupplyChain Pro v2.0**")
st.sidebar.markdown("Built with ❤️ using Streamlit")