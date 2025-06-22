import { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Profile = () => {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
        bio: user?.bio || '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        // Handle profile update
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Profile</h1>
                <Button
                    variant={isEditing ? 'success' : 'primary'}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
            </div>

            <Row>
                <Col lg={4} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <div className="position-relative d-inline-block mb-3">
                                <img
                                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&size=150&background=6c757d&color=fff`}
                                    alt="Profile"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                {isEditing && (
                                    <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <Camera size={16} />
                                    </button>
                                )}
                            </div>
                            <h4>{user?.name || 'User Name'}</h4>
                            <p className="text-muted">{user?.email}</p>
                            <div className="d-flex justify-content-center gap-2">
                                <span className="badge bg-primary">Admin</span>
                                <span className="badge bg-success">Verified</span>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">Account Statistics</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <small className="text-muted">Member Since</small>
                                <p className="mb-0">January 2023</p>
                            </div>
                            <div className="mb-3">
                                <small className="text-muted">Last Login</small>
                                <p className="mb-0">2 hours ago</p>
                            </div>
                            <div>
                                <small className="text-muted">Total Sessions</small>
                                <p className="mb-0">142</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8}>
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">Personal Information</h6>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>
                                                <User size={16} className="me-2" />
                                                Full Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>
                                                <Mail size={16} className="me-2" />
                                                Email Address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>
                                                <Phone size={16} className="me-2" />
                                                Phone Number
                                            </Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>
                                                <MapPin size={16} className="me-2" />
                                                Location
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={12} className="mb-3">
                                        <Form.Group>
                                            <Form.Label>Bio</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="Tell us about yourself..."
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="mt-4">
                        <Card.Header>
                            <h6 className="mb-0">Security Settings</h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="mb-1">Two-Factor Authentication</h6>
                                    <small className="text-muted">Add an extra layer of security to your account</small>
                                </div>
                                <Button variant="outline-primary" size="sm">
                                    Enable 2FA
                                </Button>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="mb-1">Change Password</h6>
                                    <small className="text-muted">Update your password regularly</small>
                                </div>
                                <Button variant="outline-secondary" size="sm">
                                    Change Password
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;