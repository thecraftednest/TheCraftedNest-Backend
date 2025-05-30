# The Crafted Nest - Backend API

## Setup
1. Clone repo
2. Run `npm install`
3. Create `.env` file with:

MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. Run `node createAdmin.js` to create initial admin
5. Start server: `node index.js`

## Troubleshooting
If you get "repository not found" errors:
- Check repository URL is correct
- Verify you have write permissions to the repo
- Try cloning fresh first:
```bash
git clone https://github.com/thecraftednest/TheCraftedNest-Backend.git
cd TheCraftedNest-Backend
# Copy your files here, then commit/push


You can save this as `README.md` in your project root directory. The formatting includes:
- Proper markdown headers
- Code blocks for commands and environment variables
- Clear numbered steps for setup
- Bullet points for troubleshooting
- Consistent formatting throughout