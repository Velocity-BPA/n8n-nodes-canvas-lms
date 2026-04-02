# n8n-nodes-canvas-lms

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for integrating with Canvas Learning Management System. This node provides 7 resources with comprehensive operations for managing courses, assignments, enrollments, grades, submissions, users, and analytics within Canvas LMS environments.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Canvas LMS](https://img.shields.io/badge/Canvas-LMS-orange)
![Education](https://img.shields.io/badge/Education-Platform-green)
![API Integration](https://img.shields.io/badge/API-Integration-purple)

## Features

- **Course Management** - Create, update, and manage Canvas courses with full lifecycle support
- **Assignment Operations** - Handle assignment creation, grading, and submission workflows
- **Student Enrollment** - Manage student and teacher enrollments across courses and sections
- **Grade Processing** - Automated grade entry, updates, and gradebook management
- **Submission Handling** - Process student submissions, attachments, and feedback
- **User Administration** - Create and manage user accounts, profiles, and permissions
- **Analytics Integration** - Access Canvas analytics data for reporting and insights
- **Bulk Operations** - Perform batch operations for efficient large-scale management

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-canvas-lms`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-canvas-lms
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-canvas-lms.git
cd n8n-nodes-canvas-lms
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-canvas-lms
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Canvas API access token | Yes |
| Base URL | Your Canvas instance URL (e.g., https://school.instructure.com) | Yes |
| API Version | Canvas API version (default: v1) | No |

## Resources & Operations

### 1. Course

| Operation | Description |
|-----------|-------------|
| Get | Retrieve a specific course by ID |
| Get All | List all courses with filtering options |
| Create | Create a new course |
| Update | Update course settings and information |
| Delete | Delete a course |
| Get Students | Get all students enrolled in a course |
| Get Teachers | Get all teachers for a course |

### 2. Assignment

| Operation | Description |
|-----------|-------------|
| Get | Retrieve a specific assignment |
| Get All | List all assignments for a course |
| Create | Create a new assignment |
| Update | Update assignment details |
| Delete | Delete an assignment |
| Get Submissions | Get all submissions for an assignment |
| Grade | Grade an assignment submission |

### 3. Enrollment

| Operation | Description |
|-----------|-------------|
| Get | Retrieve enrollment details |
| Get All | List enrollments with filtering |
| Create | Enroll a user in a course |
| Update | Update enrollment status or role |
| Delete | Remove an enrollment |
| Accept | Accept a pending enrollment |
| Conclude | Conclude an enrollment |

### 4. Grade

| Operation | Description |
|-----------|-------------|
| Get | Retrieve grade information |
| Get All | List grades for a course or user |
| Update | Update a grade entry |
| Post | Post grades to gradebook |
| Get History | Get grade change history |
| Calculate | Calculate final grades |

### 5. Submission

| Operation | Description |
|-----------|-------------|
| Get | Retrieve a specific submission |
| Get All | List submissions with filters |
| Create | Submit an assignment |
| Update | Update submission details |
| Grade | Grade a submission |
| Add Comment | Add feedback comments |
| Get Comments | Retrieve submission comments |

### 6. User

| Operation | Description |
|-----------|-------------|
| Get | Retrieve user profile |
| Get All | List users with search capabilities |
| Create | Create a new user account |
| Update | Update user information |
| Delete | Delete a user account |
| Get Courses | Get courses for a user |
| Get Profile | Get detailed user profile |

### 7. Analytics

| Operation | Description |
|-----------|-------------|
| Get Course Analytics | Retrieve course-level analytics |
| Get User Analytics | Get analytics for specific users |
| Get Assignment Analytics | Analyze assignment performance |
| Get Participation | Get participation data |
| Get Page Views | Retrieve page view statistics |
| Get Activity | Get activity stream data |

## Usage Examples

```javascript
// Create a new course
{
  "course": {
    "name": "Introduction to Psychology",
    "course_code": "PSY101",
    "start_at": "2024-01-15T09:00:00Z",
    "end_at": "2024-05-15T17:00:00Z",
    "is_public": false
  }
}
```

```javascript
// Enroll a student in a course
{
  "enrollment": {
    "user_id": 12345,
    "type": "StudentEnrollment",
    "enrollment_state": "active",
    "notify": true
  }
}
```

```javascript
// Create an assignment
{
  "assignment": {
    "name": "Research Paper",
    "description": "Write a 5-page research paper on cognitive psychology",
    "due_at": "2024-03-15T23:59:00Z",
    "points_possible": 100,
    "submission_types": ["online_text_entry", "online_upload"]
  }
}
```

```javascript
// Update a grade
{
  "submission": {
    "posted_grade": 85,
    "comment": {
      "text_comment": "Great work! Well-researched and clearly written."
    }
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| 401 Unauthorized | Invalid API key or expired token | Verify API key and regenerate if necessary |
| 403 Forbidden | Insufficient permissions for operation | Check user role and Canvas permissions |
| 404 Not Found | Resource doesn't exist or is inaccessible | Verify resource ID and user access rights |
| 422 Unprocessable Entity | Invalid data format or missing required fields | Review request payload and required parameters |
| 429 Rate Limited | Too many requests sent | Implement rate limiting and retry logic |
| 500 Internal Server Error | Canvas server error | Check Canvas status and retry after delay |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-canvas-lms/issues)
- **Canvas API Documentation**: [Canvas LMS REST API](https://canvas.instructure.com/doc/api/)
- **Canvas Community**: [Canvas Community Forums](https://community.canvaslms.com/)