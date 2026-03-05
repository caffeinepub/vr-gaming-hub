# VR Gaming Hub

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page website for VR Gaming Hub, Hyderabad
- Hero section with headline, subheadline, and CTA buttons (Book Your Game, Call Now)
- Why Choose Us section with 6 feature highlights
- Games section with 6 game cards (VR Zombie Shooter, VR Cricket, Racing Simulator, Multiplayer VR Battles, PS5 Gaming, Party Games) — each with image, description, Play Now button
- Pricing section with 5 packages (Single Game Session, 30 Min VR Pass, 1 Hour Unlimited, Group Package, Birthday Party Package) plus WhatsApp Book Now button
- Birthday & Party section promoting 4 event types
- Customer Reviews section with testimonials and 4.9 star rating display
- Gallery section with 8+ images of gaming experience
- Location section with embedded Google Maps iframe
- Contact section with phone, WhatsApp button, address, opening hours
- Online booking form (name, phone, date, game/package selection, group size, message)
- Game leaderboard showing top scores per game
- Floating WhatsApp button (fixed bottom-right)
- Social media links (Instagram, YouTube, WhatsApp)
- SEO meta tags for Hyderabad VR gaming keywords
- Mobile-first responsive design

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- `submitBooking(name, phone, date, game, groupSize, message)` -> returns booking ID
- `getBookings()` -> admin view of all bookings
- `getLeaderboard(game)` -> returns top 10 scores per game
- `submitScore(playerName, game, score)` -> add score entry
- `getTopScores()` -> global leaderboard

### Frontend
- Single-page app with smooth scroll navigation
- Cyberpunk theme: dark (#0a0a0f) background, neon blue (#00d4ff), neon purple (#b400ff), neon red (#ff003c) accents
- Glowing text, neon borders, animated gradient backgrounds
- Sticky navbar with logo and nav links
- All 9+ sections implemented as described
- Booking form connected to backend
- Leaderboard connected to backend
- Floating WhatsApp CTA button
- Google Maps embed for Santosh Nagar location
- SEO meta tags in index.html
- Deterministic data-ocid markers on all interactive elements
