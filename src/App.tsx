import { useMemo, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CirclePlay,
  Download,
  Flame,
  Gamepad2,
  Headphones,
  Instagram,
  Menu,
  MessageCircle,
  Play,
  Search,
  Sparkles,
  Star,
  Tv,
  Users,
  X,
  Youtube,
  Zap,
} from 'lucide-react';

type Category = 'Todos' | 'Comedia' | 'Aventura' | 'Drama' | 'Corto';

type Show = {
  title: string;
  producer: string;
  creator: string;
  category: Exclude<Category, 'Todos'>;
  rating: string;
  episodes: string;
  description: string;
  gradient: string;
  badge?: string;
  ball: string;
};

const shows: Show[] = [
  {
    title: 'Pancho: La serie',
    producer: 'Manda-Joshua Associations',
    creator: 'MmManda',
    category: 'Aventura',
    rating: '7+',
    episodes: '5 capítulos',
    description: 'Un hot dog vegetariano intenta vivir tranquilo, pero el Hombre Tutor tiene otros planes para él.',
    gradient: 'from-[#ffb347] via-[#ef6c45] to-[#b72c39]',
    badge: 'Más vista',
    ball: 'pancho',
  },
  {
    title: 'Las Californias',
    producer: 'Sulu Studios Corporation',
    creator: 'Mr.Chulin',
    category: 'Drama',
    rating: '10+',
    episodes: '3 capítulos',
    description: 'Tres hermanos separados por fronteras y guerras buscan volver a estar juntos.',
    gradient: 'from-[#73d2de] via-[#2187b8] to-[#163d70]',
    ball: 'cali',
  },
  {
    title: 'Coñaco',
    producer: 'Sur Studios LTD',
    creator: 'Marlon HD',
    category: 'Comedia',
    rating: '10+',
    episodes: '1 capítulo',
    description: 'Un ex trabajador de limones es reclutado para un concurso peligroso por 100 millones.',
    gradient: 'from-[#ffce73] via-[#ef8a3a] to-[#8d3b27]',
    ball: 'conaco',
  },
  {
    title: 'Batalla Countrytuber',
    producer: 'Manda-Joshua Associations',
    creator: 'Calamardo Triston',
    category: 'Aventura',
    rating: '10+',
    episodes: '3 capítulos',
    description: 'Countrytubers compiten en equipos y desafíos hasta que la comunidad elige al ganador.',
    gradient: 'from-[#b8e96f] via-[#4baa63] to-[#1d5c5b]',
    ball: 'battle',
  },
  {
    title: 'Luna & Sol',
    producer: 'Fam iOfficial',
    creator: 'TheGabriel2535',
    category: 'Drama',
    rating: '13+',
    episodes: '2 capítulos',
    description: 'Dos gatos con personalidades opuestas descubren secretos que nadie quería revelar.',
    gradient: 'from-[#f4b7d7] via-[#9864b5] to-[#37306b]',
    ball: 'luna',
  },
  {
    title: 'Demonic Legends',
    producer: 'Don Oroxico',
    creator: 'Don México',
    category: 'Aventura',
    rating: '13+',
    episodes: '2 capítulos',
    description: 'Cinco héroes llegan a una isla misteriosa con poderes, portales y una guerra entre religiones.',
    gradient: 'from-[#ef8354] via-[#8d3d60] to-[#231e45]',
    badge: 'Nuevo',
    ball: 'demonic',
  },
  {
    title: 'El bebé dinosaurio',
    producer: 'Papas Fritas con Huevo',
    creator: 'MmManda',
    category: 'Corto',
    rating: '7+',
    episodes: '2 capítulos',
    description: 'Cortos random hechos por preadolescentes, con mucho caos y humor inesperado.',
    gradient: 'from-[#b4ee9a] via-[#44b99c] to-[#1e5c6b]',
    ball: 'dino',
  },
  {
    title: 'Countrytubers Multiverso',
    producer: 'Fam iOfficial',
    creator: 'Fam iOfficial',
    category: 'Comedia',
    rating: '10+',
    episodes: '1 capítulo',
    description: 'Admiradores y participantes llegan al mapa del mundo para cambiar sus propias reglas.',
    gradient: 'from-[#f5d56e] via-[#f08b44] to-[#cc434a]',
    ball: 'multi',
  },
];

const features = [
  { icon: Tv, title: 'Series originales', text: 'Historias hechas por la comunidad, desde aventuras hasta comedias absurdas.' },
  { icon: MessageCircle, title: 'DimoxChat', text: 'Conecta con fans, comenta episodios y comparte tus teorías favoritas.' },
  { icon: Gamepad2, title: 'MSG Creator', text: 'Diseña tu propia serie, crea episodios y lleva tus ideas al universo Madsulu.' },
  { icon: Users, title: 'Una comunidad viva', text: 'Perfiles de creadores, contenido independiente y nuevos mundos cada semana.' },
];

const creators = [
  { name: 'Fam iOfficial', role: 'Countrytuber chileno', followers: '110K+', accent: 'bg-[#f7cb58]' },
  { name: 'Mr.Chulin', role: 'Historias de Las Californias', followers: '862+', accent: 'bg-[#78cbd1]' },
  { name: 'TheGabriel2535', role: 'Creador de Luna & Sol', followers: '160K+', accent: 'bg-[#d895d5]' },
  { name: 'JoshuaPRO5', role: 'Creador de Maja Series', followers: '14K+', accent: 'bg-[#ef8a65]' },
];

function CountryBall({ variant, size = 'md' }: { variant: string; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <div className={`country-ball ball-${variant} ball-${size}`} aria-hidden="true">
      <span className="ball-eye left" />
      <span className="ball-eye right" />
      <span className="ball-mouth" />
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredShows = useMemo(
    () => activeCategory === 'Todos' ? shows : shows.filter((show) => show.category === activeCategory),
    [activeCategory],
  );

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#101214] text-[#f7f5ef]">
      <div className="grain" />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Ir al inicio">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>Madsulu <b>GO</b></span>
        </button>
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => scrollTo('shows')}>Series</button>
          <button onClick={() => scrollTo('experience')}>La app</button>
          <button onClick={() => scrollTo('creators')}>Creadores</button>
          <button onClick={() => scrollTo('faq')}>Ayuda</button>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar"><Search size={18} /></button>
          <button className="download-button" onClick={() => scrollTo('download')}><Download size={17} /> Descargar</button>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menú">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      {searchOpen && (
        <div className="search-panel">
          <Search size={18} />
          <input autoFocus placeholder="Busca una serie, creador o aventura..." />
          <button onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X size={18} /></button>
        </div>
      )}

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> El universo countryball ya está aquí</div>
            <h1>Historias que<br /><em>no se parecen</em><br />a ninguna otra.</h1>
            <p className="hero-text">Series animadas, creadores independientes y una comunidad que siempre tiene algo nuevo que contar.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo('shows')}><CirclePlay size={18} fill="currentColor" /> Explorar series</button>
              <button className="text-button" onClick={() => scrollTo('experience')}>Conoce Madsulu GO <ArrowRight size={17} /></button>
            </div>
            <div className="hero-proof"><div className="avatar-stack"><span className="avatar a1" /><span className="avatar a2" /><span className="avatar a3" /><span className="avatar a4" /></div><span><b>25K+</b> personas ya están mirando</span></div>
          </div>
          <div className="hero-art" aria-label="Arte decorativo de countryballs">
            <div className="sun-orb" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <span className="art-label label-top">MADZAL<br /><b>MEDIA</b></span>
            <span className="art-label label-side">STORIES<br />IN MOTION</span>
            <div className="hero-ball ball-hero-one"><CountryBall variant="pancho" size="lg" /></div>
            <div className="hero-ball ball-hero-two"><CountryBall variant="cali" size="md" /></div>
            <div className="hero-ball ball-hero-three"><CountryBall variant="luna" size="sm" /></div>
            <div className="hero-sticker"><Sparkles size={15} /><span>NUEVO<br /><b>EPISODIO</b></span></div>
            <div className="hero-card"><span className="mini-play"><Play size={12} fill="currentColor" /></span><span><b>Pancho: La serie</b><small>Temporada 1 · Ep. 05</small></span><ChevronRight size={18} /></div>
          </div>
        </section>

        <section className="marquee-strip"><div className="marquee-content"><span>DESCUBRE</span><i>✦</i><span>CREA</span><i>✦</i><span>COMPARTE</span><i>✦</i><span>DESCUBRE</span><i>✦</i><span>CREA</span><i>✦</i><span>COMPARTE</span></div></section>

        <section className="section shows-section" id="shows">
          <div className="section-heading"><div><span className="section-kicker">01 / El catálogo</span><h2>Tu próxima obsesión<br /><em>empieza aquí.</em></h2></div><button className="outline-button" onClick={() => setActiveCategory('Todos')}>Ver todo el catálogo <ArrowRight size={16} /></button></div>
          <div className="filter-row">{(['Todos', 'Comedia', 'Aventura', 'Drama', 'Corto'] as Category[]).map((category) => <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="shows-grid">{filteredShows.map((show, index) => <button className={`show-card card-${index % 4}`} key={show.title} onClick={() => setSelectedShow(show)}><div className={`show-art bg-gradient-to-br ${show.gradient}`}><span className="art-no">0{index + 1}</span>{show.badge && <span className="card-badge"><Flame size={12} /> {show.badge}</span>}<CountryBall variant={show.ball} size={index === 0 ? 'lg' : 'md'} /><span className="art-lines" /></div><div className="show-info"><div><h3>{show.title}</h3><p>{show.creator} · {show.episodes}</p></div><span className="card-arrow"><ArrowRight size={16} /></span></div></button>)}</div>
        </section>

        <section className="feature-section" id="experience"><div className="feature-visual"><div className="phone-shell"><div className="phone-top"><span>Madsulu <b>GO</b></span><Bell size={15} /></div><div className="phone-hero"><span>CONTINÚA VIENDO</span><b>Pancho:<br />La serie</b><button><Play size={13} fill="currentColor" /></button></div><div className="phone-label">PARA TI <ChevronRight size={13} /></div><div className="phone-row"><span className="tiny-art t1" /><span className="tiny-art t2" /><span className="tiny-art t3" /></div><div className="phone-nav"><span>Inicio</span><span>Series</span><span>DimoxChat</span><span>Perfil</span></div></div><div className="visual-note note-one"><Zap size={14} /> Siempre algo nuevo</div><div className="visual-note note-two"><Users size={14} /> Hecho con la comunidad</div></div><div className="feature-copy"><span className="section-kicker">02 / La experiencia</span><h2>No solo miras.<br /><em>También formas parte.</em></h2><p>Madsulu GO reúne todo lo que necesitas para descubrir historias originales, hablar con otros fans y crear mundos que todavía no existen.</p><div className="feature-list">{features.map((feature) => <div className="feature-item" key={feature.title}><span className="feature-icon"><feature.icon size={19} /></span><span><b>{feature.title}</b><small>{feature.text}</small></span></div>)}</div><button className="primary-button" onClick={() => scrollTo('download')}>Descubre la app <ArrowRight size={17} /></button></div></section>

        <section className="creator-section" id="creators"><div className="section-heading"><div><span className="section-kicker">03 / La comunidad</span><h2>Creado por personas<br /><em>con algo que decir.</em></h2></div><button className="text-button">Conoce a todos <ArrowRight size={17} /></button></div><div className="creator-grid">{creators.map((creator, index) => <div className="creator-card" key={creator.name}><div className={`creator-avatar ${creator.accent}`}><CountryBall variant={['multi', 'cali', 'luna', 'battle'][index]} size="sm" /></div><div><h3>{creator.name}</h3><p>{creator.role}</p><span><Star size={12} fill="currentColor" /> {creator.followers} seguidores</span></div><ArrowRight className="creator-arrow" size={17} /></div>)}</div></section>

        <section className="download-section" id="download"><div className="download-shape shape-left" /><div className="download-shape shape-right" /><div className="download-content"><span className="section-kicker light">04 / En tu bolsillo</span><h2>El universo Madsulu<br /><em>te está esperando.</em></h2><p>Descarga Madsulu GO gratis y empieza tu siguiente aventura. Disponible para Android.</p><div className="download-actions"><button className="store-button"><span className="store-icon"><Play size={19} fill="currentColor" /></span><span><small>Disponible en</small><b>Google Play</b></span></button><div className="rating"><span className="stars">★★★★★</span><b>4.9</b><small>de nuestra comunidad</small></div></div></div><div className="download-ball"><CountryBall variant="pancho" size="lg" /></div></section>

        <section className="faq-section" id="faq"><div><span className="section-kicker">05 / Preguntas frecuentes</span><h2>¿Tienes preguntas?<br /><em>Tenemos respuestas.</em></h2></div><div className="faq-list"><details open><summary>¿Qué es Madsulu GO?<ChevronDown size={18} /></summary><p>Es una plataforma de entretenimiento countryball que reúne series originales, contenido de creadores y una comunidad activa.</p></details><details><summary>¿La aplicación es gratis?<ChevronDown size={18} /></summary><p>Sí. Madsulu GO está diseñada para ofrecer perfiles, series, chat y contenido exclusivo de forma gratuita y sin anuncios.</p></details><details><summary>¿Dónde puedo descargarla?<ChevronDown size={18} /></summary><p>Actualmente está disponible para dispositivos Android a través de Google Play.</p></details><details><summary>¿Puedo crear mi propia serie?<ChevronDown size={18} /></summary><p>Sí. Con MSG Creator puedes construir una serie, organizar episodios y exportar tus ideas para compartirlas.</p></details></div></section>

        <section className="newsletter-section"><div><span className="section-kicker">Mantente al día</span><h2>Las mejores historias<br /><em>llegan primero.</em></h2></div>{subscribed ? <div className="success-message"><BadgeCheck size={22} /><span>Listo. Revisa tu bandeja para descubrir lo nuevo.</span></div> : <form onSubmit={handleSubscribe}><label htmlFor="email">Recibe novedades de Madsulu GO</label><div className="email-row"><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Tu correo electrónico" required /><button type="submit" aria-label="Suscribirse"><ArrowRight size={19} /></button></div></form>}</section>
      </main>

      <footer className="site-footer"><div className="footer-main"><button className="brand" onClick={() => scrollTo('top')}><span className="brand-mark"><span /><span /><span /></span><span>Madsulu <b>GO</b></span></button><p>Descubre el entretenimiento countryball.<br />Historias, comunidad y mucha imaginación.</p><div className="socials"><a href="https://www.youtube.com" aria-label="Youtube"><Youtube size={17} /></a><a href="https://www.instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://discord.com" aria-label="Discord"><Headphones size={17} /></a></div></div><div className="footer-links"><div><b>Explora</b><button onClick={() => scrollTo('shows')}>Series</button><button onClick={() => scrollTo('creators')}>Creadores</button><button onClick={() => scrollTo('experience')}>La app</button></div><div><b>Ayuda</b><button onClick={() => scrollTo('faq')}>Preguntas frecuentes</button><button>Soporte</button><button>Privacidad</button></div><div><b>Contacto</b><a href="mailto:madsulugo.soporte@gmail.com">madsulugo.soporte@gmail.com</a><span>Hecho para fans, por fans.</span></div></div></footer>
      <div className="footer-bottom"><span>© 2025 Madsulu GO · MadZalMedia Incorporated.</span><span>Contenido para todas las edades según cada serie.</span></div>

      {selectedShow && <div className="modal-backdrop" onClick={() => setSelectedShow(null)}><div className="show-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedShow(null)} aria-label="Cerrar"><X size={19} /></button><div className={`modal-art bg-gradient-to-br ${selectedShow.gradient}`}><span className="art-no">SERIE ORIGINAL</span><CountryBall variant={selectedShow.ball} size="lg" /></div><div className="modal-content"><span className="section-kicker">{selectedShow.category} · {selectedShow.rating}</span><h2>{selectedShow.title}</h2><p>{selectedShow.description}</p><div className="modal-meta"><span><b>Creado por</b>{selectedShow.creator}</span><span><b>Productora</b>{selectedShow.producer}</span><span><b>Disponible</b>{selectedShow.episodes}</span></div><button className="primary-button" onClick={() => setSelectedShow(null)}><Play size={17} fill="currentColor" /> Ver detalles</button></div></div></div>}
    </div>
  );
}

export default App;
