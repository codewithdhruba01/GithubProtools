# Formspree Setup Guide

This guide will help you set up Formspree for the contact form functionality in GitHub Tools.

## What is Formspree?

Formspree is a form backend service that allows you to handle form submissions without writing server-side code. It's perfect for static sites and client-side applications.

## Setup Steps

### 1. Create a Formspree Account

1. Go to [formspree.io](https://formspree.io)
2. Click "Get Started" or "Sign Up"
3. Create an account using your email or GitHub

### 2. Create a New Form

1. After logging in, click "New Form"
2. Enter your form name: `GitHub Tools Contact Form`
3. Enter your email where you want to receive submissions
4. Click "Create Form"

### 3. Get Your Form Endpoint

1. After creating the form, you'll see your form endpoint
2. It will look like: `https://formspree.io/f/YOUR_FORM_ID`
3. Copy this URL

### 4. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace `YOUR_FORM_ID` with your actual form ID:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xpznvqko
```

### 5. Form Configuration (Optional)

You can configure additional settings in your Formspree dashboard:

#### Spam Protection
- Enable reCAPTCHA
- Set up keyword filtering
- Configure submission limits

#### Notifications
- Email notifications
- Slack notifications
- Webhook integrations

#### Redirects
- Thank you page redirects
- Error page redirects

### 6. Test the Form

1. Deploy your website or test locally
2. Fill out the contact form
3. Check your email for the submission
4. Verify the form is working correctly

## Form Fields

The contact form includes these fields:

- **Name** (required): User's full name
- **Email** (required): User's email address
- **Category**: Type of inquiry (general, bug, feature, etc.)
- **Subject** (required): Brief description
- **Message** (required): Detailed message

## Free vs Paid Plans

### Free Plan Includes:
- 50 submissions per month
- Email notifications
- Basic spam protection
- File uploads (up to 10MB)

### Paid Plans Include:
- Unlimited submissions
- Advanced spam protection
- Custom redirects
- Integrations (Slack, Zapier, etc.)
- Priority support

## Security Features

Formspree provides several security features:

- **CSRF Protection**: Prevents cross-site request forgery
- **Spam Filtering**: Built-in spam protection
- **File Type Validation**: Restricts dangerous file uploads
- **Rate Limiting**: Prevents abuse

## Troubleshooting

### Common Issues:

1. **403 Forbidden Error**
   - Make sure your form endpoint is correct
   - Check that your domain is allowed in Formspree settings

2. **Form Not Submitting**
   - Verify the endpoint URL
   - Check browser console for errors
   - Ensure all required fields are filled

3. **Not Receiving Emails**
   - Check spam/junk folder
   - Verify email address in Formspree settings
   - Test with a different email address

### Debug Mode

Add `?debug=1` to your form endpoint URL to enable debug mode:
```
https://formspree.io/f/YOUR_FORM_ID?debug=1
```

## Support

If you need help:

1. Check [Formspree Documentation](https://help.formspree.io/)
2. Contact Formspree Support
3. Check the GitHub Tools FAQ page

## Alternative Services

If Formspree doesn't meet your needs, consider these alternatives:

- **Netlify Forms**: Built into Netlify hosting
- **EmailJS**: Client-side email sending
- **GetForm**: Similar to Formspree
- **FormSubmit**: Simple HTML form handling