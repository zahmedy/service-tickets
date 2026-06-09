# service-tickets

A small web app where users can create, edit, search, and manage service tickets.

## Features
### Ticket list
    Show tickets in a table/card layout
    Fields:
        - title
        - customer name
        - status: New, In Progress, Done
        - priority: Low, Medium, High
        - created date
### Create ticket form
    Add a new ticket
    Validate required fields
    Show error messages if title/customer is empty
### Edit ticket
    Click a ticket
    Update status or priority
    Save changes
### Search/filter
    Search by customer or title
    Filter by status
    Sort by priority or date
### LocalStorage
    Save tickets in the browser
    Refreshing the page should not erase data
### Basic dashboard
    Count total tickets
    Count open tickets
    Count completed tickets
    Count high-priority tickets