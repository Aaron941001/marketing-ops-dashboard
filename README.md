# Marketing Operations Dashboard

A comprehensive, modern marketing operations dashboard built with React and TypeScript. This SaaS-style web application provides a centralized platform for managing and monitoring marketing activities across multiple channels.

## 🚀 Features

### 📊 Dashboard Analytics
- **Social Media Analytics**: Multi-platform engagement tracking (Facebook, Instagram, LinkedIn, TikTok, YouTube, X)
- **Website Analytics**: Google Analytics-style metrics with real-time user tracking
- **Email Marketing (EDM)**: Campaign performance monitoring and metrics
- **Paid Advertising**: Cross-platform ad campaign management and ROI tracking
- **User Journey Visualization**: GA4-style path exploration flowchart

### 🗓️ Social Media Scheduler
- **Calendar Interface**: Monthly view with intuitive post scheduling
- **Multi-Platform Support**: Facebook, Instagram, X, YouTube, LinkedIn, TikTok, Xiaohongshu, WeChat
- **Content Filtering**: Filter by platform, content type (Video, Image, Text)
- **Multiple Views**: Calendar, List, and Weekly view modes

### 🤖 Automation Management
- **n8n Workflow Integration**: Visual workflow management
- **Automated Campaigns**: Toggle and test automation workflows
- **Performance Monitoring**: Track automation success rates

### 💰 Budget Tracking
- **Monthly Budget Overview**: Visual budget allocation and spending
- **Forecasting**: Predictive budget analysis
- **Category Breakdown**: Detailed spending by marketing channel

### 📁 File Manager
- **Drag & Drop Upload**: Intuitive file upload interface
- **Smart Categorization**: Automatic file organization (Images, Videos, Documents, Campaign Assets)
- **Multiple Views**: Grid and List view modes
- **File Operations**: Preview, download, delete functionality
- **Search & Filter**: Advanced file search capabilities

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jessica123000/marketing-ops-dashboard.git
   cd marketing-ops-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The build folder will contain the optimized production files ready for deployment.

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional SaaS-style interface
- **Dark/Light Mode**: Automatic theme switching
- **Interactive Charts**: Hover effects and detailed tooltips
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: WCAG compliant design patterns

## 📊 Data Visualization

- **Real-time Metrics**: Live updating dashboard components
- **Interactive Charts**: Line charts, bar charts, and custom visualizations
- **Date Range Picker**: Flexible time period selection with comparison modes
- **Export Capabilities**: Data export functionality (planned)

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_endpoint
REACT_APP_ANALYTICS_ID=your_analytics_id
```

## 🚀 Deployment

This project can be deployed to various platforms:

- **Vercel**: `npm run build` then deploy the `build` folder
- **Netlify**: Connect your GitHub repository for automatic deployments
- **AWS S3**: Upload the `build` folder to an S3 bucket
- **GitHub Pages**: Use the `gh-pages` package for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts** for beautiful chart components
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent iconography
- **React** team for the amazing framework

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for modern marketing teams**
