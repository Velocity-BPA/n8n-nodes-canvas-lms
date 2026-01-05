# n8n-nodes-canvas-lms

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Canvas LMS, the leading open-source learning management system used by 6,000+ institutions and 30M+ users. This node enables workflow automation for course management, student enrollment, assignments, grades, discussions, quizzes, and learning analytics.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![Canvas LMS](https://img.shields.io/badge/Canvas-LMS-E03E2D)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

- **11 Resource Categories** - Comprehensive coverage of Canvas LMS API
- **80+ Operations** - Full CRUD operations plus specialized actions
- **Link Header Pagination** - Automatic handling of Canvas pagination
- **SIS Integration** - Support for SIS IDs across all resources
- **File Upload Support** - Multi-step file upload process
- **Include Parameter Support** - Expand related data in responses
- **Date Handling** - Proper ISO 8601 date formatting

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-canvas-lms`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-canvas-lms
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-canvas-lms.git
cd n8n-nodes-canvas-lms

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-canvas-lms

# Restart n8n
n8n start
```

## Credentials Setup

### Canvas API Credentials

| Field | Type | Description |
|-------|------|-------------|
| Domain | String | Your Canvas domain (e.g., `yourschool.instructure.com`) |
| Access Token | Password | API access token from Canvas |

### Obtaining an Access Token

1. Log in to your Canvas instance
2. Go to **Account** > **Settings**
3. Scroll to **Approved Integrations**
4. Click **+ New Access Token**
5. Enter a purpose and expiration date
6. Click **Generate Token**
7. Copy the token immediately (it won't be shown again)

## Resources & Operations

### Courses
| Operation | Description |
|-----------|-------------|
| Create | Create a new course |
| Get | Get course details |
| Get All | List courses |
| Update | Update course |
| Delete | Delete course |
| Conclude | Conclude course |
| Reset | Reset course content |
| Copy | Copy course to new course |
| Get Users | List course users |
| Get Enrollments | List course enrollments |

### Users
| Operation | Description |
|-----------|-------------|
| Create | Create a new user |
| Get | Get user details |
| Get All | List users |
| Update | Update user |
| Delete | Delete user |
| Get Enrollments | Get user enrollments |
| Get Courses | Get user courses |
| Get Profile | Get user profile |
| Update Avatar | Update user avatar |
| Get Custom Data | Get custom data |

### Enrollments
| Operation | Description |
|-----------|-------------|
| Create | Enroll user in course |
| Get | Get enrollment details |
| Get All | List enrollments |
| Update | Update enrollment |
| Delete | Remove enrollment |
| Conclude | Conclude enrollment |
| Reactivate | Reactivate enrollment |

### Assignments
| Operation | Description |
|-----------|-------------|
| Create | Create assignment |
| Get | Get assignment details |
| Get All | List assignments |
| Update | Update assignment |
| Delete | Delete assignment |
| Duplicate | Duplicate assignment |
| Get Submissions | List submissions |
| Get Overrides | Get due date overrides |

### Submissions
| Operation | Description |
|-----------|-------------|
| Get | Get submission |
| Get All | List submissions |
| Create | Submit on behalf of user |
| Update | Update submission |
| Grade | Update grade |
| Add Comment | Add feedback comment |
| Upload File | Upload submission file |

### Modules
| Operation | Description |
|-----------|-------------|
| Create | Create module |
| Get | Get module |
| Get All | List modules |
| Update | Update module |
| Delete | Delete module |
| Get Items | List module items |
| Create Item | Add item to module |
| Update Progress | Update student progress |
| Unlock | Unlock module |

### Quizzes
| Operation | Description |
|-----------|-------------|
| Create | Create quiz |
| Get | Get quiz |
| Get All | List quizzes |
| Update | Update quiz |
| Delete | Delete quiz |
| Get Questions | List quiz questions |
| Create Question | Add question |
| Get Submissions | List quiz attempts |

### Discussions
| Operation | Description |
|-----------|-------------|
| Create | Create discussion topic |
| Get | Get discussion |
| Get All | List discussions |
| Update | Update discussion |
| Delete | Delete discussion |
| Get Entries | List replies |
| Create Entry | Add reply |
| Mark Read | Mark as read |

### Grades
| Operation | Description |
|-----------|-------------|
| Get All | List grades for course |
| Update | Update grade |
| Get Grading Periods | List grading periods |
| Get Grading Standards | Get grading standards |

### Files
| Operation | Description |
|-----------|-------------|
| Get | Get file metadata |
| Get All | List files |
| Upload | Upload file |
| Update | Update file metadata |
| Delete | Delete file |
| Download | Get download URL |
| Get Folders | List folders |
| Create Folder | Create folder |

### Announcements
| Operation | Description |
|-----------|-------------|
| Create | Create announcement |
| Get | Get announcement |
| Get All | List announcements |
| Update | Update announcement |
| Delete | Delete announcement |

## Usage Examples

### Create a Course

```javascript
// Course creation workflow
{
  "resource": "course",
  "operation": "create",
  "accountId": "1",
  "name": "Introduction to Computer Science",
  "additionalFields": {
    "courseCode": "CS101",
    "startAt": "2025-01-15T00:00:00Z",
    "endAt": "2025-05-15T00:00:00Z",
    "license": "private",
    "isPublic": false
  }
}
```

### Enroll a Student

```javascript
// Student enrollment workflow
{
  "resource": "enrollment",
  "operation": "create",
  "courseId": "123",
  "userId": "456",
  "enrollmentType": "StudentEnrollment",
  "additionalFields": {
    "enrollmentState": "active",
    "notifyUser": true
  }
}
```

### Grade an Assignment

```javascript
// Grading workflow
{
  "resource": "submission",
  "operation": "grade",
  "courseId": "123",
  "assignmentId": "789",
  "userId": "456",
  "gradeOptions": {
    "postedGrade": "95",
    "comment": "Excellent work!"
  }
}
```

### Create an Announcement

```javascript
// Announcement workflow
{
  "resource": "announcement",
  "operation": "create",
  "courseId": "123",
  "title": "Welcome to the Course!",
  "message": "<p>Welcome to CS101. Please review the syllabus.</p>",
  "additionalFields": {
    "pinned": true
  }
}
```

## Canvas LMS Concepts

### Enrollment Types
- **StudentEnrollment** - Standard student access
- **TeacherEnrollment** - Instructor with full course control
- **TaEnrollment** - Teaching assistant with limited grading
- **ObserverEnrollment** - View-only access (parents, auditors)
- **DesignerEnrollment** - Course design without grading

### Quiz Types
- **practice_quiz** - Ungraded practice
- **assignment** - Graded quiz
- **graded_survey** - Survey with points
- **survey** - Ungraded survey

### Submission Types
- **online_text_entry** - Text submission
- **online_url** - URL submission
- **online_upload** - File upload
- **media_recording** - Audio/video
- **student_annotation** - Document annotation

## Error Handling

The node handles common Canvas API errors:

| Error Code | Description | Resolution |
|------------|-------------|------------|
| 401 | Unauthorized | Check access token validity |
| 403 | Forbidden | Verify user permissions |
| 404 | Not Found | Check resource IDs |
| 422 | Unprocessable Entity | Validate request parameters |
| 429 | Rate Limited | Reduce request frequency |

## Security Best Practices

1. **Token Security** - Store access tokens securely using n8n credentials
2. **Minimal Permissions** - Use tokens with only required permissions
3. **Token Rotation** - Regularly rotate access tokens
4. **HTTPS Only** - All Canvas API communication uses HTTPS
5. **Audit Logging** - Monitor API usage in Canvas admin

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
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
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-canvas-lms/issues)
- **Documentation**: [Canvas API Docs](https://canvas.instructure.com/doc/api/)
- **Commercial Support**: licensing@velobpa.com

## Acknowledgments

- [Instructure](https://www.instructure.com/) for the Canvas LMS platform
- [n8n](https://n8n.io/) for the workflow automation platform
- The Canvas LMS developer community
