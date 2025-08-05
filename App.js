import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Package, 
  Truck, 
  Users, 
  Calendar, 
  DollarSign, 
  Bell, 
  Search,
  Send,
  Paperclip,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Video,
  Settings,
  Menu,
  Plus,
  TrendingUp,
  Building,
  User,
  BarChart3,
  FileText,
  Zap
} from 'lucide-react';

const SuperappIntegrationDemo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessage, setChatMessage] = useState('');
  const [notifications, setNotifications] = useState(5);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Supply Chain Bot',
      message: '🚨 Low stock alert: Product B is below reorder point (25 units remaining)',
      time: '10:30 AM',
      type: 'alert',
      hasAction: true,
      actionData: { sku: 'SKU002', quantity: 25, reorderPoint: 30 }
    },
    {
      id: 2,
      sender: 'Raj Kumar (Driver)',
      message: 'Shipment SH001 delayed by 2 hours due to traffic. New ETA: 3:00 PM',
      time: '10:25 AM',
      type: 'update'
    },
    {
      id: 3,
      sender: 'Finance Team',
      message: 'Invoice #INV001 for ₹1,75,000 needs approval',
      time: '10:20 AM',
      type: 'approval',
      hasAction: true
    },
    {
      id: 4,
      sender: 'You',
      message: 'What\'s the status of our Mumbai warehouse?',
      time: '10:15 AM',
      type: 'user'
    },
    {
      id: 5,
      sender: 'Supply Chain Bot',
      message: 'Mumbai Warehouse: 89% capacity, 24 active shipments, 3 pending deliveries',
      time: '10:16 AM',
      type: 'bot'
    }
  ]);

  const quickActions = [
    { icon: Package, label: 'Check Inventory', color: 'bg-blue-500' },
    { icon: Truck, label: 'Track Shipment', color: 'bg-green-500' },
    { icon: DollarSign, label: 'Approve Invoice', color: 'bg-yellow-500' },
    { icon: Users, label: 'Team Status', color: 'bg-purple-500' }
  ];

  const widgets = [
    {
      title: 'Today\'s KPIs',
      icon: BarChart3,
      data: [
        { label: 'Orders', value: '47', change: '+8%' },
        { label: 'Shipments', value: '24', change: '-3%' },
        { label: 'Revenue', value: '₹8.9M', change: '+15%' }
      ]
    },
    {
      title: 'Active Alerts',
      icon: AlertTriangle,
      data: [
        { label: 'Low Stock', value: '3', status: 'critical' },
        { label: 'Delayed Shipments', value: '1', status: 'warning' },
        { label: 'Pending Approvals', value: '5', status: 'info' }
      ]
    }
  ];

  const teams = [
    { name: 'Supply Chain', members: 12, online: 8, avatar: '🚛' },
    { name: 'Finance', members: 8, online: 6, avatar: '💰' },
    { name: 'Operations', members: 15, online: 12, avatar: '⚙️' },
    { name: 'Sales', members: 20, online: 16, avatar: '📈' }
  ];

  const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user';
    const isBot = message.type === 'bot';
    const isAlert = message.type === 'alert';
    
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 
          isAlert ? 'bg-red-50 border border-red-200' :
          isBot ? 'bg-gray-100' : 'bg-white border'
        }`}>
          {!isUser && (
            <div className="text-sm font-medium text-gray-600 mb-1">{message.sender}</div>
          )}
          <div className={isUser ? 'text-white' : 'text-gray-800'}>{message.message}</div>
          <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.time}
          </div>
          {message.hasAction && (
            <div className="mt-2 space-y-2">
              {message.type === 'alert' && (
                <div className="flex space-x-2">
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                    Reorder Now
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700">
                    View Details
                  </button>
                </div>
              )}
              {message.type === 'approval' && (
                <div className="flex space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700">
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ChatView = () => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Supply Chain Team</h3>
            <p className="text-sm text-gray-500">12 members • 8 online</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <Phone className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded">
            <Video className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2 mb-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-white text-xs ${action.color} hover:opacity-90`}
              >
                <Icon className="h-4 w-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="flex space-x-2">
          <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none"
            />
            <button className="text-gray-500 hover:text-gray-700">
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Integrated Dashboard</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgets.map((widget, index) => {
          const Icon = widget.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{widget.title}</h3>
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="space-y-2">
                {widget.data.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.value}</span>
                      {item.change && (
                        <span className={`text-xs ${
                          item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </span>
                      )}
                      {item.status && (
                        <span className={`w-2 h-2 rounded-full ${
                          item.status === 'critical' ? 'bg-red-500' :
                          item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Workflow Example */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Smart Workflow Integration</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
            <Zap className="h-6 w-6 text-blue-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium">Automated Process</h4>
              <p className="text-sm text-gray-600 mb-2">
                When inventory drops below reorder point → Auto-notify procurement team → 
                Create purchase order → Send for approval → Track delivery
              </p>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                  Configure Workflow
                </button>
                <button className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-xs">
                  View History
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-medium">Real-time Collaboration</h4>
              <p className="text-sm text-gray-600 mb-2">
                Shipment delays automatically notify customers → Update delivery teams → 
                Adjust schedules → Send proactive communications
              </p>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs">
                  Active Now
                </button>
                <button className="border border-green-600 text-green-600 px-3 py-1 rounded text-xs">
                  View Impact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamsView = () => (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Teams & Collaboration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{team.avatar}</div>
                <div>
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm text-gray-500">{team.members} members</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{team.online} online</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm">
                Join Channel
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded text-sm">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'chat', name: 'Chat', icon: MessageCircle },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'teams', name: 'Teams', icon: Users },
    { id: 'calendar', name: 'Calendar', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Corporate SuperApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r">
          <div className="p-4">
            <nav className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Recent Activity */}
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Low stock alert</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Shipment delivered</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Approval pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'chat' && <ChatView />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'teams' && <TeamsView />}
          {activeTab === 'calendar' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Calendar Integration</h3>
                <p className="text-gray-500">Schedule meetings, track deliveries, manage deadlines</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperappIntegrationDemo;