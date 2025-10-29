
export const ItemTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  SELECT: 'select',
  EMAIL: 'email',
  TEL: 'tel',
};

export interface FormField {
  id: string;
  type: keyof typeof ItemTypes;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export const formFields: FormField[] = [
  { id: '1', type: 'text', label: 'Text Input' },
  { id: '2', type: 'textarea', label: 'Text Area' },
  { id: '3', type: 'checkbox', label: 'Checkbox' },
  { id: '4', type: 'radio', label: 'Radio Button', options: ['Option 1', 'Option 2'] },
  { id: '5', type: 'select', label: 'Select Menu', options: ['Option A', 'Option B'] },
  { id: '6', type: 'email', label: 'Email Input' },
  { id: '7', type: 'tel', label: 'Phone Input' },
];

export interface Form {
    id: string;
    title: string;
    description: string;
    fields: FormField[];
}

export interface FormSubmission {
    formId: string;
    submittedAt: Date;
    data: Record<string, string | boolean>;
}

// Mock data for created forms
export const forms: Form[] = [
    {
        id: 'event-signup-123',
        title: 'Event Signup Form',
        description: 'Sign up for our upcoming annual game development conference.',
        fields: [
            { id: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true },
            { id: 'email', type: 'email', label: 'Email Address', placeholder: 'john.doe@example.com', required: true },
            { id: 'attendance', type: 'radio', label: 'Will you attend in person?', options: ['Yes', 'No'], required: true },
            { id: 'interests', type: 'select', label: 'Primary Interest', options: ['Programming', 'Art & Animation', 'Game Design', 'Sound & Music'], placeholder: 'Select your interest' },
        ]
    },
    {
        id: 'feedback-form-456',
        title: 'Game Feedback Form',
        description: 'Tell us what you think about our latest game, NeonRush.',
        fields: [
            { id: 'player_name', type: 'text', label: 'Player Name', placeholder: 'PlayerOne' },
            { id: 'rating', type: 'select', label: 'Overall Rating', options: ['1 - Poor', '2 - Fair', '3 - Good', '4 - Very Good', '5 - Excellent'], required: true },
            { id: 'feedback', type: 'textarea', label: 'What did you like or dislike?', placeholder: 'The controls felt...', required: true },
            { id: 'subscribe', type: 'checkbox', label: 'Subscribe to our newsletter for updates.' },
        ]
    }
];

// Mock data for form submissions
export const submissions: FormSubmission[] = [
    {
        formId: 'event-signup-123',
        submittedAt: new Date('2024-05-01T10:00:00Z'),
        data: { name: 'Alice', email: 'alice@example.com', attendance: 'Yes', interests: 'Programming' }
    },
    {
        formId: 'event-signup-123',
        submittedAt: new Date('2024-05-01T11:30:00Z'),
        data: { name: 'Bob', email: 'bob@example.com', attendance: 'Yes', interests: 'Art & Animation' }
    },
    {
        formId: 'feedback-form-456',
        submittedAt: new Date('2024-05-02T14:00:00Z'),
        data: { player_name: 'Charlie', rating: '5 - Excellent', feedback: 'Loved the art style!', subscribe: true }
    },
     {
        formId: 'event-signup-123',
        submittedAt: new Date('2024-05-02T15:00:00Z'),
        data: { name: 'David', email: 'david@example.com', attendance: 'No', interests: 'Sound & Music' }
    },
];
