# Formspree Integration Guide

## How to Set Up Formspree for RAMA Website

### Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a New Form
1. Log into your Formspree dashboard
2. Click "New Form"
3. Choose "Regular Form" (not AJAX)
4. Give it a name like "RAMA Trial Booking"
5. Copy the form endpoint URL (looks like: `https://formspree.io/f/xxxxxxxx`)

### Step 3: Update the Website Forms
1. Open `index.html` in your code editor
2. Find the trial booking form (around line 770)
3. Find the enrollment form (around line 678)
4. Add the `action` attribute to both forms:

```html
<form id="trial-form" class="bg-brand-bg rounded-xl p-8 shadow-lg" 
      action="https://formspree.io/f/mandlzra" method="POST" data-aos="fade-up">
```

✅ **Formspree endpoint integrated: `https://formspree.io/f/mandlzra`**
✅ **Forms now send copies to: `fatma.hfaiedh@royalarsenal.club`**
✅ **Email address is VERIFIED in Formspree dashboard**

**CONFIGURATION CONFIRMED:** The `fatma.hfaiedh@royalarsenal.club` email is verified and working in Formspree.

**✅ ISSUE RESOLVED:** Email notifications were not working because "Email notifications" needed to be enabled in the Formspree dashboard user settings.

### Important: Email Configuration
The forms are currently configured to send emails to `fatma.hfaiedh@royalarsenal.club` using the `_cc` field. 

**TROUBLESHOOTING: Forms Submit But No Emails Received**

If you see Formspree's thank you page but don't receive emails:

1. **Check Formspree Dashboard:**
   - Go to [https://formspree.io](https://formspree.io)
   - Log into your account
   - Find form endpoint `mandlzra`
   - Verify it shows "Active" or "Verified" status
   - Check if submissions appear in the dashboard

2. **Verify Your Email:**
   - Check your email for Formspree verification messages
   - Click any verification links
   - Confirm your account is activated

3. **Check Email Settings:**
   - In Formspree dashboard → Form Settings
   - Verify "Send submissions to" email address
   - Ensure notifications are enabled

**To change the primary recipient email address:**
1. Log into your Formspree dashboard at [https://formspree.io](https://formspree.io)
2. Find the form with endpoint `mandlzra`
3. Go to Settings → Email Settings
4. Update the "Send submissions to" email address to `trial@royalarsenal.club`
5. Save the changes

**Final Production Configuration:**
- Primary recipient: `trial@royalarsenal.club` (set in Formspree dashboard) 
- Email notifications: ✅ ENABLED in Formspree user settings
- Redirect after submission: `https://royalarsenal.club/thank-you.html`
- Form field names: Standardized (`name`, `email`, `phone`) for JavaScript validation
- All forms ready for production deployment

**⚠️ IMPORTANT:** You need to update the Formspree dashboard to send emails to `trial@royalarsenal.club` instead of the previous address.

### Step 4: Add Form Fields Mapping
Make sure your form fields have the correct `name` attributes (they already do):

- `name="name"` - Full Name
- `name="phone"` - Phone Number  
- `name="email"` - Email Address
- `name="age-group"` - Age Group
- `name="preferred-day"` - Preferred Day
- `name="message"` - Message
- `name="consent"` - Consent checkbox

### Step 5: Test the Form
1. Save your changes
2. Upload to your web server
3. Test the form submission
4. Check your Formspree dashboard for submissions

### Step 6: Configure Formspree Settings
In your Formspree dashboard:
1. Go to "Settings" for your form
2. Set up email notifications
3. Configure auto-responder (optional)
4. Set up spam protection if needed

### Step 7: Customize Success/Error Pages (Optional)
You can redirect users after form submission:

```html
<form action="https://formspree.io/f/mandlzra" method="POST">
  <!-- form fields -->
  <input type="hidden" name="_redirect" value="https://royalarsenal.club/thank-you.html">
  <input type="hidden" name="_subject" value="New Trial Booking from RAMA Website">
</form>
```

### Alternative: Netlify Forms
If you prefer Netlify Forms instead:

1. Add `netlify` attribute to your form:
```html
<form name="trial-booking" method="POST" netlify>
```

2. Add a hidden input for Netlify:
```html
<input type="hidden" name="form-name" value="trial-booking" />
```

3. Deploy to Netlify and forms will work automatically

## WhatsApp Integration Status

✅ **WhatsApp Integration is Working!**

The WhatsApp button is properly configured with:
- **Phone Number**: +971501156988
- **Pre-filled Message**: "Hi RAMA team! I'd like to book a free trial."
- **Mobile Call Button**: Also working for direct calls

### Test WhatsApp Integration:
1. Click the floating WhatsApp button (bottom-right)
2. It should open WhatsApp with the pre-filled message
3. The mobile call button (bottom-left on mobile) should dial +971501156988

## Form Validation
The form includes client-side validation:
- Phone number is required
- Name is required  
- Email format validation
- Consent checkbox required
- Error messages display below fields

## Troubleshooting

### Form Not Submitting?
1. Check the form action URL is correct
2. Verify all required fields have `name` attributes
3. Check browser console for JavaScript errors
4. Test with a simple form first

### WhatsApp Not Working?
1. Check the phone number format (+971501156988)
2. Test on mobile device (WhatsApp works best on mobile)
3. Verify the message encoding in the URL

## Thank You Page

✅ **Thank You Page Created!**

The website includes a professional thank you page (`thank-you.html`) that users will see after form submission.

**Features:**
- ✅ Success confirmation with animated checkmark
- ✅ Clear next steps for the user
- ✅ Contact information for immediate assistance
- ✅ Links back to main website sections
- ✅ Professional design matching the main site
- ✅ Mobile-responsive layout

**Forms are configured to redirect to:**
```
https://royalarsenal.club/thank-you.html
```

**Customization:**
- Update the redirect URL if your domain changes
- Modify the thank you page content as needed
- Add additional contact methods or information

### Need Help?
- Formspree Documentation: https://formspree.io/help/
- WhatsApp API Documentation: https://wa.me/
- Contact the development team for technical support
