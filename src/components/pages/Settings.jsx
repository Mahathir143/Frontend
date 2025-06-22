import { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Bell, Shield, Palette, Globe } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        weeklyReports: true,
        darkMode: false,
        language: 'en',
        timezone: 'UTC',
        autoSave: true,
        publicProfile: false,
    });

    const handleToggle = (setting) => {
        setSettings({
            ...settings,
            [setting]: !settings[setting],
        });
    };

    const handleSelectChange = (setting, value) => {
        setSettings({
            ...settings,
            [setting]: value,
        });
    };

    const handleSave = () => {
        console.log('Saving settings:', settings);
        // Handle settings save
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Settings</h1>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </div>

            <Row>
                <Col lg={6} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">
                                <Bell size={18} className="me-2" />
                                Notifications
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Email Notifications</h6>
                                        <small className="text-muted">Receive updates via email</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.emailNotifications}
                                        onChange={() => handleToggle('emailNotifications')}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Push Notifications</h6>
                                        <small className="text-muted">Receive browser notifications</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.pushNotifications}
                                        onChange={() => handleToggle('pushNotifications')}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Weekly Reports</h6>
                                        <small className="text-muted">Get weekly activity summary</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.weeklyReports}
                                        onChange={() => handleToggle('weeklyReports')}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">
                                <Palette size={18} className="me-2" />
                                Appearance
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Dark Mode</h6>
                                        <small className="text-muted">Switch to dark theme</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.darkMode}
                                        onChange={() => handleToggle('darkMode')}
                                    />
                                </div>
                            </div>
                            <div>
                                <Form.Group>
                                    <Form.Label>Theme Color</Form.Label>
                                    <Form.Select>
                                        <option value="blue">Blue (Default)</option>
                                        <option value="green">Green</option>
                                        <option value="purple">Purple</option>
                                        <option value="red">Red</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">
                                <Globe size={18} className="me-2" />
                                Localization
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <Form.Group>
                                    <Form.Label>Language</Form.Label>
                                    <Form.Select
                                        value={settings.language}
                                        onChange={(e) => handleSelectChange('language', e.target.value)}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div>
                                <Form.Group>
                                    <Form.Label>Timezone</Form.Label>
                                    <Form.Select
                                        value={settings.timezone}
                                        onChange={(e) => handleSelectChange('timezone', e.target.value)}
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="EST">Eastern Time</option>
                                        <option value="PST">Pacific Time</option>
                                        <option value="CET">Central European Time</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} className="mb-4">
                    <Card>
                        <Card.Header>
                            <h6 className="mb-0">
                                <Shield size={18} className="me-2" />
                                Privacy & Security
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Auto Save</h6>
                                        <small className="text-muted">Automatically save changes</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.autoSave}
                                        onChange={() => handleToggle('autoSave')}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-1">Public Profile</h6>
                                        <small className="text-muted">Make profile visible to others</small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        checked={settings.publicProfile}
                                        onChange={() => handleToggle('publicProfile')}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Card>
                <Card.Header>
                    <h6 className="mb-0">Danger Zone</h6>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 className="mb-1 text-danger">Delete Account</h6>
                            <small className="text-muted">Permanently delete your account and all data</small>
                        </div>
                        <Button variant="outline-danger" size="sm">
                            Delete Account
                        </Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="mb-1 text-warning">Export Data</h6>
                            <small className="text-muted">Download all your account data</small>
                        </div>
                        <Button variant="outline-warning" size="sm">
                            Export Data
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Settings;