# bicycle-booking-admin

We need to create an admin panel for a company that provides bicycle booking services.

**The functionality is quite simple:**
- user can add a bicycle with fields (ID, name, type, color, wheel size, price, description)
- added bicycle is displayed on the list of bicycles
- user can change the status of the bicycle (available/busy/unavailable)
- user can remove a bicycle
- user can check stats on bicycles (number of bicycles, number of available bicycles, number of booked bicycles, average price of a bicycle)

**GENERAL REQUIREMENTS:**

1. Create form data validation:
-  All text fields minimum length should be 5 characters
- All number fields should accept only the number
- All fields are required
- All Bike IDs should be unique
2. An app should be pushed to a public GitHub repository with README instructions describing how one can start it in development mode.

**SOLUTION REQUIREMENTS:**  
You need to build on the **backend** side a REST API that allows storing data mentioned above and calculating stats. On the frontend side React app that uses this API.
1. Data validation should work consistently
2. Components should be reactively updated
3. Use Express to build REST API that satisfies the app functionality
4. Use MongoDB to store data

[Design](https://www.figma.com/file/pIU4QX9TlF6vOw1x1Vf8yB/ADMIN.BIKE-BOOKING.COM?node-id=105:108)