# Hacker Theme - Pure HTML/CSS/JS

A dark, terminal-style theme for your website. No build tools, no Jekyll, just simple HTML/CSS/JS.

![Hacker Theme](thumbnail.png)

## ?? Quick Start

### Run Locally
1. **Double-click** `index.html` in File Explorer, or
2. **Visual Studio**: Right-click `index.html` ? "View in Browser"

### Deploy to GitHub Pages
1. Commit and push your changes:
```bash
git add .
git commit -m "Update website"
git push origin master
```

2. Go to your repository settings ? Pages ? Enable GitHub Pages from `master` branch

3. Your site will be live at: `https://valen030.github.io/memento-mori-H3AV3N/`

## ?? Project Structure

```
??? css/
?   ??? style.css          # All your styles
??? js/
?   ??? main.js            # JavaScript interactions
?   ??? config.js          # Site configuration
??? images/
?   ??? bullet.svg         # List bullet
?   ??? blacktocat.svg     # GitHub icon
??? index.html             # Home page
??? another-page.html      # Example page
??? .nojekyll             # Tells GitHub to serve HTML directly
```

## ?? How to Edit

### Update Content
Just edit the HTML files directly:
- `index.html` - Your main page
- `another-page.html` - Additional pages

### Change Colors
Edit `css/style.css` at the top:
```css
:root {
  --cod-grey: #151515;      /* Background */
  --gallery: #eaeaea;       /* Text color */
  --conifer: #b5e853;       /* Headers & accents */
  --silver-chalice: #aaa;   /* Blockquotes */
  --dove-grey: #666;        /* Secondary text */
}
```

### Add JavaScript
Edit `js/main.js` for interactions or `js/config.js` for site settings.

## ?? Features

- ? Pure HTML/CSS/JS (no build process)
- ? Responsive design
- ? Dark hacker/terminal theme
- ? Syntax highlighting for code
- ? Works on GitHub Pages
- ? Easy to customize

## ?? Adding New Pages

1. Copy `another-page.html`
2. Rename it (e.g., `about.html`)
3. Edit the content
4. Link to it from other pages: `<a href="about.html">About</a>`

## ?? No Dependencies Required

- ? No Node.js
- ? No Ruby/Jekyll
- ? No package managers
- ? No build tools

Just edit and go! ??

## ?? License

This theme is open source under the MIT License. See [LICENSE](LICENSE) for details.

## ?? Credits

Based on the original [Hacker theme](https://github.com/pages-themes/hacker) for GitHub Pages, converted to pure HTML/CSS/JS.
