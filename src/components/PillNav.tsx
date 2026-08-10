import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: '作品', href: '#work' },
  { label: '能力', href: '#capabilities' },
  { label: '经历', href: '#experience' },
  { label: '联系', href: '#contact' },
]

const observedSections = ['top', ...navItems.map(item => item.href.slice(1))]

export function PillNav() {
  const reduceMotion = useReducedMotion()
  const [activeHref, setActiveHref] = useState('#top')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveHref(`#${visible.target.id}`)
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.15, 0.4] },
    )

    observedSections.forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const focusTimer = window.setTimeout(() => {
      mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    }, reduceMotion ? 0 : 180)

    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }

      if (event.key !== 'Tab' || !mobileMenuRef.current) return
      const links = [...mobileMenuRef.current.querySelectorAll<HTMLAnchorElement>('a')]
      const first = links[0]
      const last = links.at(-1)

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    window.addEventListener('keydown', keepFocusInMenu)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', keepFocusInMenu)
    }
  }, [menuOpen, reduceMotion])

  const closeMenu = () => setMenuOpen(false)

  return (
    <motion.header
      className="pill-nav-shell"
      initial={reduceMotion ? false : { opacity: 0, y: -54, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <a className="pill-nav__brand" href="#top" aria-label="返回顶部" onClick={closeMenu}>
        <img src="./assets/logo.svg" alt="" aria-hidden="true" />
      </a>

      <LayoutGroup id="primary-navigation">
        <nav className="pill-nav__links" aria-label="主导航">
          {navItems.map(item => {
            const active = activeHref === item.href
            return (
              <a href={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'location' : undefined} key={item.href}>
                {active && <motion.span className="pill-nav__active" layoutId="active-pill" transition={{ type: 'spring', stiffness: 360, damping: 32 }} />}
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>
      </LayoutGroup>

      <a className="pill-nav__email" href="mailto:953092385@qq.com">
        953092385@qq.com
      </a>

      <button
        ref={menuButtonRef}
        className="pill-nav__menu-button"
        type="button"
        aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            ref={mobileMenuRef}
            className="pill-nav__mobile"
            id="mobile-navigation"
            aria-label="移动端导航"
            initial={reduceMotion ? false : { opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0 round 20px)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0 round 20px)' }}
            exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0 round 20px)' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          >
            {navItems.map(item => (
              <a href={item.href} className={activeHref === item.href ? 'is-active' : ''} onClick={closeMenu} key={item.href}>
                {item.label}
              </a>
            ))}
            <a href="mailto:953092385@qq.com" onClick={closeMenu}>发送邮件</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
