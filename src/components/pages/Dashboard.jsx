import { useQuery } from '@tanstack/react-query';
import { Card, Row, Col } from 'react-bootstrap';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

const Dashboard = () => {
    // Example data fetching with React Query
    const { data: stats, isLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            // Replace with actual API call
            return {
                totalUsers: 1234,
                revenue: 98765,
                orders: 456,
                growth: 12.5,
            };
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            color: 'primary',
            growth: '+5.2%',
        },
        {
            title: 'Revenue',
            value: `$${stats?.revenue?.toLocaleString() || 0}`,
            icon: DollarSign,
            color: 'success',
            growth: '+12.8%',
        },
        {
            title: 'Orders',
            value: stats?.orders || 0,
            icon: Activity,
            color: 'info',
            growth: '+8.1%',
        },
        {
            title: 'Growth',
            value: `${stats?.growth || 0}%`,
            icon: TrendingUp,
            color: 'warning',
            growth: '+2.3%',
        },
    ];

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Dashboard</h1>
                <button className="btn btn-primary">
                    <TrendingUp size={18} className="me-2" />
                    View Reports
                </button>
            </div>

            <Row>
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Col lg={3} md={6} className="mb-4" key={index}>
                            <Card className="h-100">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 className="card-subtitle mb-2 text-muted">{stat.title}</h6>
                                            <h3 className="card-title mb-1">{stat.value}</h3>
                                            <small className="text-success">{stat.growth} from last month</small>
                                        </div>
                                        <div className={`bg-${stat.color} text-white rounded p-2`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>

            <Row>
                <Col lg={8} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Recent Activity</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>John Doe</td>
                                            <td>Created new order</td>
                                            <td>2 hours ago</td>
                                            <td><span className="badge bg-success">Completed</span></td>
                                        </tr>
                                        <tr>
                                            <td>Jane Smith</td>
                                            <td>Updated profile</td>
                                            <td>4 hours ago</td>
                                            <td><span className="badge bg-info">Updated</span></td>
                                        </tr>
                                        <tr>
                                            <td>Bob Johnson</td>
                                            <td>Cancelled order</td>
                                            <td>6 hours ago</td>
                                            <td><span className="badge bg-danger">Cancelled</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Quick Actions</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-grid gap-2">
                                <button className="btn btn-outline-primary">Add New User</button>
                                <button className="btn btn-outline-success">Create Order</button>
                                <button className="btn btn-outline-info">Generate Report</button>
                                <button className="btn btn-outline-warning">Send Notification</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;