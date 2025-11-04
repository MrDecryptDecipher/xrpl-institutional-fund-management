# Support Page Feature Documentation

## Overview

A dedicated support page has been added to the XRPL Institutional Fund Management Protocol application to provide users with easy access to developer contact information and technical details about the platform.

## Feature Details

### Support Page Component

File: [src/components/SupportPage.tsx](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/src/components/SupportPage.tsx)

The SupportPage component includes:
- Developer information (Sandeep Kumar Sahoo)
- Direct email contact (sandeep.savethem2@gmail.com)
- Technical details about the platform
- Navigation back to the main application

### Navigation Integration

File: [src/App.tsx](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/src/App.tsx)

Navigation has been added to:
1. Main landing page - "Need Support? Contact Developer" link
2. Dashboard - "Support" button in the top left corner

### Access Points

Users can access the support page in two ways:
1. From the main landing page before connecting wallet
2. From the dashboard after connecting wallet

## Implementation Details

### State Management

The application uses React state to manage which view is displayed:
- `showSupportPage` - Boolean flag to toggle between main app and support page
- Navigation functions to switch between views

### Component Structure

The SupportPage component is a standalone React component that:
- Receives an `onBack` callback function as a prop
- Displays developer information prominently
- Provides direct email link for support
- Shows technical details about the platform
- Includes navigation back to the main application

### Styling

The support page maintains the same design language as the rest of the application:
- Glassmorphism UI effects with backdrop blur
- Consistent color scheme and typography
- Responsive layout for different screen sizes
- Gradient backgrounds and subtle shadows

## Developer Information

The support page prominently features:
- Name: Sandeep Kumar Sahoo
- Role: Lead Developer & Creator
- Contact: sandeep.savethem2@gmail.com
- Acknowledgment: Built the entire platform from the ground up

## Technical Details

The support page includes information about:
- XRPL Standards implemented:
  - XLS-33 MPT Tokens
  - XLS-80 Permissioned Domains
  - XLS-40 DID Identity
- Institutional-grade implementation
- Multi-jurisdictional compliance capabilities

## Usage Instructions

### For Users
1. Navigate to http://3.111.22.56:5002/
2. Click "Need Support? Contact Developer" link on the main page OR
3. After connecting wallet, click "Support" button in the dashboard
4. View developer information and technical details
5. Click the email link to contact support directly
6. Use the back button to return to the main application

### For Developers
To modify the support page:
1. Edit [src/components/SupportPage.tsx](file:///home/ubuntu/Sandeep/projects/XRPL/xrpl_institutional_fund_management_protocol%20(1)/src/components/SupportPage.tsx)
2. Update developer information as needed
3. Modify technical details to reflect current implementation
4. Test navigation between main app and support page

## Testing

The feature has been tested for:
- Navigation between main app and support page
- Email link functionality
- Responsive design on different screen sizes
- Consistent styling with the rest of the application
- Back button functionality

## Future Enhancements

Potential future improvements:
1. Add FAQ section
2. Include documentation links
3. Add form for submitting support requests
4. Integrate with ticketing system
5. Add live chat functionality