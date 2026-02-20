# DEMO READINESS CHECKLIST - Stitch & Style

## Pre-Demo Setup (5 minutes)

### Backend Configuration
- [ ] Stop any running Flask instances: `Ctrl+C`
- [ ] Delete old database: `rm instance/dev.db` (optional - only if DB schema changed)
- [ ] Run database init: `python tryon-server/init_db.py`
  - This creates fresh database with sample products
  - Creates test users (if any)
- [ ] Verify `.env` file exists with:
  ```
  JWT_SECRET=your-secure-random-string-here
  SECRET_KEY=another-secure-random-string-here
  ```
- [ ] Start Flask server: `cd tryon-server && python app.py`
  - Should show: `Running on http://127.0.0.1:5000`
  - Should NOT show SECRET_KEY warnings

### Frontend Configuration  
- [ ] Verify `.env` file exists in project root with:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```
- [ ] Start dev server: `npm run dev`
  - Should show: `Local: http://localhost:5173/`
  - Navigate to `http://localhost:5173/ `in browser

---

## Security Fixes Verification (Quick Test)

### Test 1: User Isolation (5 seconds)
**Verify**: Users can only access their own orders
1. Login as user1
2. Create order
3. Open DevTools → Console
4. Run: `fetch('http://localhost:5000/api/orders/999').then(r=>r.json()).then(c=>console.log(c))`
5. **Expected**: `{"error": "Access denied. You can only view your own orders."}`

### Test 2: Order Quantity Limit (5 seconds)
**Verify**: Can't order more than 10 items
1. Go to Shop → Select any product
2. Try to set quantity to 100
3. Click Checkout
4. **Expected**: Error message "Maximum 10 items per order"

### Test 3: File Upload Validation (5 seconds)
**Verify**: Only image files accepted, max 5MB
1. Go to Try On
2. Try uploading `.exe` or `.txt` file
3. **Expected**: Error "Invalid file type. Expected image file"

### Test 4: Session Expiration (10 seconds)
**Verify**: Expired tokens auto-redirect to login
1. Login successfully
2. Go to Dashboard (user authenticated)
3. Wait 24 hours OR manually edit localStorage to set token expiration to past time
4. Click any action requiring authentication
5. **Expected**: Auto-redirect to `/login` with "Session expired" message

### Test 5: CORS Protection (5 seconds)
**Verify**: Non-whitelisted origins blocked
1. Open browser console on different port (e.g., http://localhost:3001)
2. Try: `fetch('http://localhost:5000/api/products').then(r=>r.json())`
3. **Expected**: CORS error in console

---

## Demo Script (2-3 minutes)

### Scenario 1: Normal User Flow
1. **Register**: New user signup with email
2. **Browse**: Show products on Shop page
3. **Order**: Select product → Add to cart → Checkout
4. **Dashboard**: Show order history in User Dashboard
5. **Try On**: Upload selfie → Show try-on result

### Scenario 2: Security Demonstration
1. **Show code fixes**: 
   - Open `SECURITY_HARDENING_COMPLETE.md`
   - Point out each fix in code (use VS Code search)
2. **Quick test**: One of the security tests above (Test 1: User Isolation is quickest)

### Scenario 3: Admin Features (Optional)
1. **Login as admin**: Use admin account
2. **Admin Dashboard**: Show order management
3. **Product management**: Show admin-only features

---

## Common Troubleshooting

### Backend won't start: "sqlite3.OperationalError"
- Delete database: `rm instance/dev.db`
- Reinitialize: `python init_db.py`

### Frontend shows blank/error page
- Check console for error messages
- Verify `.env` file has VITE_API_URL
- Ensure Flask is running on port 5000

### CORS Error "No 'Access-Control-Allow-Origin' header"
- Verify Flask is running (check console output)
- Check backend `.env` has valid secrets

### Login fails
- Check `.env` has JWT_SECRET set
- Verify database has user (check with init_db.py)

### Try-on upload fails
- Check `static/uploads/` folder exists
- Verify file is actual image (not renamed file)
- Check file size < 5MB

---

## Files Modified for Security

✅ `tryon-server/config.py` - Secret validation  
✅ `tryon-server/app.py` - CORS, JWT, order & upload security  
✅ `tryon-server/models.py` - Database cascade delete  
✅ `src/services/api.js` - 401 handling, env variables  
✅ `.env` - Backend & frontend configuration  

---

## Estimated Demo Duration
- **Setup**: 5 minutes
- **Normal flow demo**: 2-3 minutes
- **Security verification**: 1-2 minutes
- **Questions/Discussion**: 5-10 minutes
- **Total**: 15-20 minutes

---

## Key Points to Mention to Examiner

1. **Security Audit**: 6 critical vulnerabilities → 0 critical (all fixed)
2. **User Data Protection**: User isolation prevents unauthorized order access
3. **File Upload Safety**: Extension/size/MIME validation prevents malicious uploads
4. **Session Security**: Automatic logout on token expiration
5. **Database Integrity**: Cascade delete prevents orphaned records
6. **Configuration**: Environment variables for dev/prod flexibility

---

**Last Updated**: Post-security-hardening  
**Status**: ✅ READY FOR FINAL EXAM EVALUATION
