/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

export interface ICanvasCourse extends IDataObject {
	id: number;
	name: string;
	account_id: number;
	uuid: string;
	start_at: string;
	grading_standard_id: number;
	is_public: boolean;
	created_at: string;
	course_code: string;
	default_view: string;
	root_account_id: number;
	enrollment_term_id: number;
	license: string;
	grade_passback_setting: string;
	end_at: string;
	public_syllabus: boolean;
	public_syllabus_to_auth: boolean;
	storage_quota_mb: number;
	is_public_to_auth_users: boolean;
	homeroom_course: boolean;
	course_color: string;
	friendly_name: string;
	apply_assignment_group_weights: boolean;
	time_zone: string;
	blueprint: boolean;
	template: boolean;
	sis_course_id: string;
	sis_import_id: number;
	integration_id: string;
	enrollments: ICanvasEnrollment[];
	hide_final_grades: boolean;
	workflow_state: string;
	restrict_enrollments_to_course_dates: boolean;
}

export interface ICanvasUser extends IDataObject {
	id: number;
	name: string;
	sortable_name: string;
	short_name: string;
	login_id: string;
	sis_user_id: string;
	sis_import_id: number;
	integration_id: string;
	created_at: string;
	email: string;
	avatar_url: string;
	locale: string;
	effective_locale: string;
	last_login: string;
	time_zone: string;
	bio: string;
	enrollments: ICanvasEnrollment[];
}

export interface ICanvasEnrollment extends IDataObject {
	id: number;
	course_id: number;
	sis_course_id: string;
	course_integration_id: string;
	course_section_id: number;
	section_integration_id: string;
	sis_account_id: string;
	sis_section_id: string;
	sis_user_id: string;
	enrollment_state: string;
	limit_privileges_to_course_section: boolean;
	sis_import_id: number;
	root_account_id: number;
	type: string;
	user_id: number;
	associated_user_id: number;
	role: string;
	role_id: number;
	created_at: string;
	updated_at: string;
	start_at: string;
	end_at: string;
	last_activity_at: string;
	last_attended_at: string;
	total_activity_time: number;
	html_url: string;
	grades: ICanvasGrade;
	user: ICanvasUser;
	override_grade: string;
	override_score: number;
	unposted_current_grade: string;
	unposted_final_grade: string;
	unposted_current_score: string;
	unposted_final_score: string;
	has_grading_periods: boolean;
	totals_for_all_grading_periods_option: boolean;
	current_grading_period_title: string;
	current_grading_period_id: number;
	current_period_override_grade: string;
	current_period_override_score: number;
	current_period_unposted_current_score: number;
	current_period_unposted_final_score: number;
	current_period_unposted_current_grade: string;
	current_period_unposted_final_grade: string;
}

export interface ICanvasAssignment extends IDataObject {
	id: number;
	name: string;
	description: string;
	created_at: string;
	updated_at: string;
	due_at: string;
	lock_at: string;
	unlock_at: string;
	has_overrides: boolean;
	all_dates: IDataObject[];
	course_id: number;
	html_url: string;
	submissions_download_url: string;
	assignment_group_id: number;
	due_date_required: boolean;
	allowed_extensions: string[];
	max_name_length: number;
	turnitin_enabled: boolean;
	vericite_enabled: boolean;
	turnitin_settings: IDataObject;
	grade_group_students_individually: boolean;
	external_tool_tag_attributes: IDataObject;
	peer_reviews: boolean;
	automatic_peer_reviews: boolean;
	peer_review_count: number;
	peer_reviews_assign_at: string;
	intra_group_peer_reviews: boolean;
	group_category_id: number;
	needs_grading_count: number;
	needs_grading_count_by_section: IDataObject[];
	position: number;
	post_to_sis: boolean;
	integration_id: string;
	integration_data: IDataObject;
	points_possible: number;
	submission_types: string[];
	has_submitted_submissions: boolean;
	grading_type: string;
	grading_standard_id: number;
	published: boolean;
	unpublishable: boolean;
	only_visible_to_overrides: boolean;
	locked_for_user: boolean;
	lock_info: IDataObject;
	lock_explanation: string;
	quiz_id: number;
	anonymous_submissions: boolean;
	discussion_topic: IDataObject;
	freeze_on_copy: boolean;
	frozen: boolean;
	frozen_attributes: string[];
	submission: ICanvasSubmission;
	use_rubric_for_grading: boolean;
	rubric_settings: IDataObject;
	rubric: IDataObject[];
	assignment_visibility: number[];
	overrides: IDataObject[];
	omit_from_final_grade: boolean;
	moderated_grading: boolean;
	grader_count: number;
	final_grader_id: number;
	grader_comments_visible_to_graders: boolean;
	graders_anonymous_to_graders: boolean;
	grader_names_visible_to_final_grader: boolean;
	anonymous_grading: boolean;
	allowed_attempts: number;
	post_manually: boolean;
	score_statistics: IDataObject;
	can_submit: boolean;
	annotatable_attachment_id: number;
	anonymize_students: boolean;
	require_lockdown_browser: boolean;
	important_dates: boolean;
	muted: boolean;
	anonymous_peer_reviews: boolean;
	anonymous_instructor_annotations: boolean;
	graded_submissions_exist: boolean;
	is_quiz_assignment: boolean;
	in_closed_grading_period: boolean;
	can_duplicate: boolean;
	original_course_id: number;
	original_assignment_id: number;
	original_lti_resource_link_id: number;
	original_assignment_name: string;
	original_quiz_id: number;
	workflow_state: string;
}

export interface ICanvasSubmission extends IDataObject {
	id: number;
	assignment_id: number;
	assignment: ICanvasAssignment;
	course: ICanvasCourse;
	attempt: number;
	body: string;
	grade: string;
	grade_matches_current_submission: boolean;
	html_url: string;
	preview_url: string;
	score: number;
	submission_comments: IDataObject[];
	submission_type: string;
	submitted_at: string;
	url: string;
	user_id: number;
	grader_id: number;
	graded_at: string;
	user: ICanvasUser;
	late: boolean;
	assignment_visible: boolean;
	excused: boolean;
	missing: boolean;
	late_policy_status: string;
	points_deducted: number;
	seconds_late: number;
	workflow_state: string;
	extra_attempts: number;
	anonymous_id: string;
	posted_at: string;
	read_status: string;
	redo_request: boolean;
	entered_grade: string;
	entered_score: number;
	attachments: IDataObject[];
	media_comment: IDataObject;
}

export interface ICanvasModule extends IDataObject {
	id: number;
	workflow_state: string;
	position: number;
	name: string;
	unlock_at: string;
	require_sequential_progress: boolean;
	prerequisite_module_ids: number[];
	items_count: number;
	items_url: string;
	items: ICanvasModuleItem[];
	state: string;
	completed_at: string;
	publish_final_grade: boolean;
	published: boolean;
}

export interface ICanvasModuleItem extends IDataObject {
	id: number;
	module_id: number;
	position: number;
	title: string;
	indent: number;
	type: string;
	content_id: number;
	html_url: string;
	url: string;
	page_url: string;
	external_url: string;
	new_tab: boolean;
	completion_requirement: IDataObject;
	content_details: IDataObject;
	published: boolean;
}

export interface ICanvasQuiz extends IDataObject {
	id: number;
	title: string;
	html_url: string;
	mobile_url: string;
	preview_url: string;
	description: string;
	quiz_type: string;
	assignment_group_id: number;
	time_limit: number;
	shuffle_answers: boolean;
	hide_results: string;
	show_correct_answers: boolean;
	show_correct_answers_last_attempt: boolean;
	show_correct_answers_at: string;
	hide_correct_answers_at: string;
	one_time_results: boolean;
	scoring_policy: string;
	allowed_attempts: number;
	one_question_at_a_time: boolean;
	question_count: number;
	points_possible: number;
	cant_go_back: boolean;
	access_code: string;
	ip_filter: string;
	due_at: string;
	lock_at: string;
	unlock_at: string;
	published: boolean;
	unpublishable: boolean;
	locked_for_user: boolean;
	lock_info: IDataObject;
	lock_explanation: string;
	speedgrader_url: string;
	quiz_extensions_url: string;
	permissions: IDataObject;
	all_dates: IDataObject[];
	version_number: number;
	question_types: string[];
	anonymous_submissions: boolean;
}

export interface ICanvasDiscussion extends IDataObject {
	id: number;
	title: string;
	message: string;
	html_url: string;
	posted_at: string;
	last_reply_at: string;
	require_initial_post: boolean;
	user_can_see_posts: boolean;
	discussion_subentry_count: number;
	read_state: string;
	unread_count: number;
	subscribed: boolean;
	subscription_hold: string;
	assignment_id: number;
	delayed_post_at: string;
	published: boolean;
	lock_at: string;
	locked: boolean;
	pinned: boolean;
	locked_for_user: boolean;
	lock_info: IDataObject;
	lock_explanation: string;
	user_name: string;
	topic_children: number[];
	group_topic_children: IDataObject[];
	root_topic_id: number;
	podcast_url: string;
	discussion_type: string;
	group_category_id: number;
	attachments: IDataObject[];
	permissions: IDataObject;
	allow_rating: boolean;
	only_graders_can_rate: boolean;
	sort_by_rating: boolean;
	user: ICanvasUser;
	author: ICanvasUser;
}

export interface ICanvasGrade extends IDataObject {
	html_url: string;
	current_grade: string;
	final_grade: string;
	current_score: string;
	final_score: string;
	current_points: number;
	unposted_current_grade: string;
	unposted_final_grade: string;
	unposted_current_score: string;
	unposted_final_score: string;
	unposted_current_points: number;
}

export interface ICanvasFile extends IDataObject {
	id: number;
	uuid: string;
	folder_id: number;
	display_name: string;
	filename: string;
	'content-type': string;
	url: string;
	size: number;
	created_at: string;
	updated_at: string;
	unlock_at: string;
	locked: boolean;
	hidden: boolean;
	lock_at: string;
	hidden_for_user: boolean;
	thumbnail_url: string;
	modified_at: string;
	mime_class: string;
	media_entry_id: string;
	locked_for_user: boolean;
	lock_info: IDataObject;
	lock_explanation: string;
	preview_url: string;
}

export interface ICanvasFolder extends IDataObject {
	id: number;
	name: string;
	full_name: string;
	context_id: number;
	context_type: string;
	parent_folder_id: number;
	created_at: string;
	updated_at: string;
	lock_at: string;
	unlock_at: string;
	position: number;
	locked: boolean;
	folders_url: string;
	files_url: string;
	files_count: number;
	folders_count: number;
	hidden: boolean;
	locked_for_user: boolean;
	hidden_for_user: boolean;
	for_submissions: boolean;
	can_upload: boolean;
}

export interface ICanvasAnnouncement extends IDataObject {
	id: number;
	title: string;
	message: string;
	html_url: string;
	posted_at: string;
	last_reply_at: string;
	require_initial_post: boolean;
	user_can_see_posts: boolean;
	discussion_subentry_count: number;
	read_state: string;
	unread_count: number;
	subscribed: boolean;
	delayed_post_at: string;
	published: boolean;
	lock_at: string;
	locked: boolean;
	pinned: boolean;
	locked_for_user: boolean;
	lock_info: IDataObject;
	lock_explanation: string;
	user_name: string;
	attachments: IDataObject[];
	permissions: IDataObject;
	context_code: string;
}

export interface ICanvasGradingPeriod extends IDataObject {
	id: number;
	title: string;
	start_date: string;
	end_date: string;
	close_date: string;
	weight: number;
	is_closed: boolean;
}

export interface ICanvasGradingStandard extends IDataObject {
	id: number;
	title: string;
	context_id: number;
	context_type: string;
	grading_scheme: IDataObject[];
}

export interface ICanvasPaginationParams extends IDataObject {
	page?: number;
	per_page?: number;
}

export interface ICanvasApiResponse<T> {
	data: T;
	headers: {
		link?: string;
	};
}

export type CanvasResource =
	| 'course'
	| 'user'
	| 'enrollment'
	| 'assignment'
	| 'submission'
	| 'module'
	| 'quiz'
	| 'discussion'
	| 'grade'
	| 'file'
	| 'announcement';

export type CourseOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'conclude'
	| 'reset'
	| 'copy'
	| 'getUsers'
	| 'getEnrollments';

export type UserOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getEnrollments'
	| 'getCourses'
	| 'getProfile'
	| 'updateAvatar'
	| 'getCustomData';

export type EnrollmentOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'conclude'
	| 'reactivate';

export type AssignmentOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'duplicate'
	| 'getSubmissions'
	| 'getOverrides';

export type SubmissionOperation =
	| 'get'
	| 'getAll'
	| 'create'
	| 'update'
	| 'grade'
	| 'addComment'
	| 'uploadFile';

export type ModuleOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getItems'
	| 'createItem'
	| 'updateProgress'
	| 'unlock';

export type QuizOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getQuestions'
	| 'createQuestion'
	| 'getSubmissions';

export type DiscussionOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'getEntries'
	| 'createEntry'
	| 'markRead';

export type GradeOperation =
	| 'getAll'
	| 'update'
	| 'getGradingPeriods'
	| 'getGradingStandards';

export type FileOperation =
	| 'upload'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete'
	| 'download'
	| 'getFolders'
	| 'createFolder';

export type AnnouncementOperation =
	| 'create'
	| 'get'
	| 'getAll'
	| 'update'
	| 'delete';
