# Ideas for Videregående Hjelp

## 💡 Feature Ideas & Improvements

### 🎨 **Design & UX**

- [ ] **Breadcrumb Navigation** - Helps users understand page hierarchy (Home > Guides > New Students)

### 📱 **Progressive Web App (PWA)**

- [ ] **Install Ability** - Add manifest.json to make it installable on phones/desktops

### 🔍 **Search & Discovery**

- [ ] **Recent Searches** - Show recently viewed guides in sidebar or dropdown
- [ ] **Full-Text Search** - Currently only searches titles and keywords; index guide content too

### 📚 **Content Expansion**

- [ ] **More Guides**
  - [x] Mental health & stress management in VGS
  - [ ] Social life & friend groups
  - [x] Job opportunities during/after VGS
  - [ ] Study abroad or exchange programs
  - [ ] Extracurricular activities & clubs
  - [ ] Time management strategies (specific guides, not just tips)
  - [ ] Dealing with specific school subjects (math, languages, sciences)
  - [ ] Social media & digital citizenship for teens
  - [ ] Debt & credit for youth
  - [ ] University/college preparation

- [ ] **More Tools/Interactives**
  - [ ] **Subject Difficulty Calculator** - Based on student struggles

### 🎓 **Learning Features**

- [ ] **Personalized Recommendations** - Suggest guides based on user profile (new/current/finished)
- [ ] **Progress Tracking** - Save user progress (completed guides, bookmarks)
- [ ] **Bookmarks System** - Save important guides for later
- [ ] **Print-Friendly Versions** - Make guides easier to print
- [ ] **PDF Downloads** - Export guides as PDFs for offline reading

### 🔗 **Integration & Sharing**

- [ ] **RSS Feed** - Subscribe to new guides
- [ ] **Discord Bot Integration** - Share content in school Discord servers
- [x] **Embed Guides** - Allow schools to embed tools on their sites (Technically possible with IFrames in HTML, we haven't restricted that.)
- [ ] **QR Codes** - Link from school materials to relevant guides

### ⚙️ **Technical Improvements**

- [ ] **Performance Optimization**
  - [ ] Lazy load images (Not needed right now)
  - [ ] Use WebP images for faster loading (Not needed right now)
  - [ ] Implement code splitting

- [ ] **Code Organization**
  - [ ] Create shared CSS utility classes to reduce duplication
  - [ ] Extract shared JavaScript into modules
  - [ ] Use a CSS framework or design tokens system
  - [ ] Consider static site generator (11ty, Hugo) for scalability

- [ ] **SEO Enhancement**
  - [most] Add meta descriptions to all pages
  - [ ] Implement structured data (Schema.org)
  - [x] Create sitemap.xml and robots.txt
  - [ ] Improve Open Graph tags for social sharing
  - [ ] Focus on keyword optimization

- [ ] **Testing**
  - [x] Unit tests for JavaScript functionality
  - [x] E2E tests for key user flows
  - [x] Accessibility testing (axe, Lighthouse)
  - [x] Cross-browser compatibility testing

- [ ] **Developer Experience**
  - [ ] Set up build tooling (Webpack, Vite) (maybe webpack later on idk)
  - [ ] Create component library documentation
  - [ ] Add TypeScript for safety (will need a compiler though, unsure if typescript is directly supported in web browsers or not)