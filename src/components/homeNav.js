import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import Icon from "./icon";

// Content (BodyWrapper in page.js) stays plain-centered; the nav sits in
// the right margin that leaves, directly against content's own right edge
// plus a GAP — not part of any shared centered group.
export const CONTENT_WIDTH = 950;
export const GAP = 100;
export const NAV_WIDTH = 161;

const NAV_LEFT = CONTENT_WIDTH / 2 + GAP;

// Header's border-bottom sits at 65px (32px of top/bottom padding plus its
// own content height), and BodyWrapper adds another 60px of padding-top
// before content starts — so content begins at 125px. The nav sits exactly
// there until scrolled, then settles closer to the top of the viewport.
const CONTENT_TOP = 122;
const PINNED_TOP = 80;

// Below this, the nav stays `position: absolute` (i.e. anchored to the
// document, scrolling normally) instead of `fixed`. At scrollY 0,
// overscroll bounce (scrolling up past the top) visually stretches the
// normal-flow header down with it; a `fixed` element doesn't move during
// that, which looked broken sitting right next to a header that does.
// Waiting until there's been real, deliberate scrolling avoids that
// mismatch. Set to exactly CONTENT_TOP - PINNED_TOP so the switch is
// seamless: that's the scroll distance at which the absolute-positioned
// nav (scrolling normally with the document) would already be sitting at
// PINNED_TOP anyway, so flipping to fixed there causes no visible jump.
const SCROLL_THRESHOLD = CONTENT_TOP - PINNED_TOP;

// The mobile menu toggle shows up after just a small scroll, rather than
// waiting for the (much later) desktop pin threshold above.
const MOBILE_TOGGLE_THRESHOLD = 10;

const NavContainer = styled.div`
  position: ${(props) => (props.pinned ? "fixed" : "absolute")};
  top: ${(props) => (props.pinned ? PINNED_TOP : CONTENT_TOP)}px;
  left: calc(50% + ${NAV_LEFT}px);
  width: ${NAV_WIDTH}px;

  display: flex;
  flex-direction: column;

  /* Hidden until scrolled (see "pinned"), rather than shown by default at
     the top of the page. */
  opacity: ${(props) => (props.pinned ? 1 : 0)};
  pointer-events: ${(props) => (props.pinned ? "auto" : "none")};
  transition: opacity var(--transition-duration);

  /* Below this, there isn't enough margin beside the content for the nav
     to sit without overlapping it (or running off the edge of the
     viewport). */
  @media (max-width: 1500px) {
    display: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// Mobile: a header-aligned toggle button that opens the same nav full
// screen, since there's no room for it to sit beside the content there.
// Only shown once scrolled (the real header's own "Home" link covers the
// same need at the very top), and the white circle + border keep it
// legible sitting over scrolled-past content.
const MobileToggle = styled.button`
  position: fixed;
  top: var(--element-spacing);
  right: 20px;
  z-index: 1700;

  display: none;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  border: 1px solid var(--border-color);
  background: var(--background-primary);
  border-radius: 50%;
  box-shadow: var(--shadow);
  cursor: pointer;

  color: var(--color-muted-2);

  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? "auto" : "none")};
  transition:
    opacity var(--transition-duration),
    color var(--transition-duration);

  &:hover {
    color: var(--color-title);
  }

  @media (max-width: 1500px) {
    display: flex;
  }
`;

// A small dropdown anchored below MobileToggle, like a selector, rather
// than a full-screen takeover — so it doesn't need a site title of its own
// and doesn't lock page scroll.
const MobileDropdown = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 1600;

  display: none;
  flex-direction: column;
  gap: 1px;

  min-width: 200px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;

  padding: 6px;

  background: var(--background-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-hover);

  transform-origin: top right;
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) =>
    props.open ? "scale(1) translateY(0)" : "scale(0.96) translateY(-6px)"};
  pointer-events: ${(props) => (props.open ? "auto" : "none")};
  transition:
    opacity var(--transition-duration),
    transform var(--transition-duration);

  @media (max-width: 1500px) {
    display: flex;
  }
`;

const MobileNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;

  border: 0;
  border-radius: 6px;
  background: none;
  padding: 10px 10px;

  font: inherit;
  font-size: var(--size-small);
  text-align: left;
  cursor: pointer;

  color: ${(props) =>
    props.active ? "var(--color-title)" : "var(--color-muted-1)"};

  &:hover {
    background: var(--background-secondary);
  }
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;

  border: 0;
  background: none;
  padding: 6px 0;

  font: inherit;
  font-size: var(--size-small);
  text-align: left;
  cursor: pointer;

  color: ${(props) =>
    props.active ? "var(--color-title)" : "var(--color-muted-2)"};

  transition: color var(--transition-duration);

  &:hover {
    color: var(--color-title);
  }
`;

// "home" is handled separately (scrolls to top instead of to an element
// id) and always shown. The rest must match a <HomeSection id="..."> wrapper
// rendered in src/pages/index.js.
const HOME_ITEM = { id: "home", icon: "home", label: "Home" };

const SECTIONS = [
  { id: "experience", icon: "experience", label: "Experience" },
  { id: "education", icon: "education", label: "Education" },
  { id: "phd-thesis", icon: "bookmark", label: "Ph.D. Thesis" },
  { id: "publications", icon: "publications", label: "Publications" },
  { id: "projects", icon: "projects", label: "Projects" },
  { id: "posts", icon: "posts", label: "Posts" },
  { id: "talks", icon: "talks", label: "Talks" },
  { id: "teaching", icon: "teaching", label: "Teaching" },
  { id: "misc", icon: "misc", label: "Miscellaneous" },
];

const HomeNav = ({ visibility }) => {
  const items = [
    HOME_ITEM,
    ...SECTIONS.filter((section) => visibility[section.id]),
  ];

  const [activeId, setActiveId] = useState("home");
  const [pinned, setPinned] = useState(false);
  const [mobileToggleVisible, setMobileToggleVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // A small anchored dropdown (not a full-screen takeover) closes on
  // Escape or on any click/tap outside itself and its toggle button,
  // rather than locking page scroll like a modal would.
  const mobileWrapperRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const handlePointerDown = (e) => {
      if (
        mobileWrapperRef.current &&
        !mobileWrapperRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [mobileOpen]);

  // Clicking a nav item should keep that item highlighted even if the page
  // can't actually scroll far enough to bring its section to the nav's own
  // top line (e.g. clicking Teaching or Misc near the bottom of the page,
  // where there isn't enough room left to scroll and Talks would otherwise
  // stay "active"). The override sticks until the user scrolls on their
  // own again, at which point auto-detection resumes.
  const overrideIdRef = useRef(null);

  useEffect(() => {
    const ids = items.map((item) => item.id).filter((id) => id !== "home");

    let ticking = false;
    const update = () => {
      ticking = false;

      setPinned(window.scrollY > SCROLL_THRESHOLD);

      const toggleVisible = window.scrollY > MOBILE_TOGGLE_THRESHOLD;
      setMobileToggleVisible(toggleVisible);
      // Scrolling back up past the toggle's own threshold should close the
      // dropdown along with it (fading out together) rather than leaving
      // it open with no visible toggle to close it.
      if (!toggleVisible) setMobileOpen(false);

      if (overrideIdRef.current) return;

      // The section whose top has crossed the nav's own top offset is the
      // one currently at the top of the viewport.
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= CONTENT_TOP + 1) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    // Only real, user-initiated scroll input (not the smooth-scroll
    // animation from clicking a nav item) clears the override.
    const clearOverride = () => {
      overrideIdRef.current = null;
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", clearOverride, { passive: true });
    window.addEventListener("touchmove", clearOverride, { passive: true });
    window.addEventListener("keydown", clearOverride);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", clearOverride);
      window.removeEventListener("touchmove", clearOverride);
      window.removeEventListener("keydown", clearOverride);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility]);

  const scrollToSection = (id) => {
    overrideIdRef.current = id;
    setActiveId(id);
    setMobileOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavContainer pinned={pinned}>
        <NavList aria-label="Sections">
          {items.map((item) => (
            <NavItem
              key={item.id}
              active={item.id === activeId}
              onClick={() => scrollToSection(item.id)}
            >
              <Icon name={item.icon} width={15} height={15} />
              {item.label}
            </NavItem>
          ))}
        </NavList>
      </NavContainer>

      <div ref={mobileWrapperRef}>
        <MobileToggle
          visible={mobileToggleVisible}
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <Icon name={mobileOpen ? "close" : "menu"} width={16} height={16} />
        </MobileToggle>

        <MobileDropdown open={mobileOpen} aria-label="Sections">
          {items.map((item) => (
            <MobileNavItem
              key={item.id}
              active={item.id === activeId}
              onClick={() => scrollToSection(item.id)}
            >
              <Icon name={item.icon} width={18} height={18} />
              {item.label}
            </MobileNavItem>
          ))}
        </MobileDropdown>
      </div>
    </>
  );
};

export default HomeNav;
