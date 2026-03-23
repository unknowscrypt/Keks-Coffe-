/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Cake, 
  Clock, 
  MapPin, 
  Instagram, 
  Send, 
  Star, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Heart,
  Zap,
  CheckCircle2
} from 'lucide-react';

// Types
interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface Review {
  name: string;
  text: string;
  rating: number;
  date: string;
}

// Data
const MENU_COFFEE: MenuItem[] = [
  { name: 'Эспрессо', price: '170/200₽', description: '15/30 мл' },
  { name: 'Американо', price: '230/330₽', description: '200/350 мл' },
  { name: 'Капучино', price: '320/410₽', description: '200/380 мл' },
  { name: 'Латте', price: '350/430₽', description: '300/400 мл' },
  { name: 'Флэт Уайт', price: '350₽', description: '200 мл' },
  { name: 'Раф', price: '370/460₽', description: '300/400 мл' },
  { name: 'Раф Кокос', price: '420/500₽', description: '300/400 мл' },
  { name: 'Мокачино', price: '380/450₽', description: '300/400 мл' },
  { name: 'Гляссе', price: '370₽', description: '300 мл' },
];

const MENU_TEA: MenuItem[] = [
  { name: 'Черный чай', price: '240/390₽', description: '300/500 мл' },
  { name: 'Зеленый чай', price: '240/390₽', description: '300/500 мл' },
  { name: 'Чай с добавками', price: '320/550₽', description: 'Облепиховый, клюквенный, имбирный' },
  { name: 'Травяные чаи', price: '260/450₽', description: 'Таежный сбор, шиповник малина' },
  { name: 'Латте Матча', price: '400₽', description: 'Насыщенный вкус' },
  { name: 'Иван-чай', price: '260/450₽', description: 'Традиционный вкус' },
  { name: 'Гречишный с яблоком', price: '450₽', description: 'Авторский микс' },
];

const MENU_DRINKS: MenuItem[] = [
  { name: 'Фреш', price: '330/520₽', description: 'Яблоко, морковь, апельсин' },
  { name: 'Молочный коктейль', price: '370₽', description: 'Банан, клубника, ваниль, шоколад' },
  { name: 'Какао с маршмеллоу', price: '450₽', description: 'Уютный напиток' },
  { name: 'Смузи', price: '370-420₽', description: 'Питательный, клубничный, тропический' },
];

const MENU_BREAKFAST: MenuItem[] = [
  { name: 'Каша овсяная с ягодами', price: '410₽' },
  { name: 'Каша рисовая с пюре манго', price: '410₽' },
  { name: 'Яйцо Бенедикт с авокадо', price: '680₽', description: 'С карпаччо из индейки' },
  { name: 'Глазунья', price: '470₽', description: 'С охотничьими колбасками' },
  { name: 'Омлет с творожным сыром', price: '490₽', description: 'С соусом песто' },
  { name: 'Гранола с йогуртом', price: '390₽' },
  { name: 'Сырники со свежими ягодами', price: '480₽' },
  { name: 'Тост с нутеллой', price: '280₽', description: 'С бананом и клубникой' },
];

const MENU_LUNCH: MenuItem[] = [
  { name: 'Борщ с курицей', price: '450₽' },
  { name: 'Крем-суп из шампиньонов', price: '470₽' },
  { name: 'Солянка мясная', price: '450₽' },
  { name: 'Салат со страчателлой', price: '650₽', description: 'С помидорами черри' },
  { name: 'Салат форелью и авокадо', price: '710₽' },
  { name: 'Салат со свеклой и фетой', price: '500₽' },
];

const REVIEWS: Review[] = [
  { name: 'Анна С.', text: 'Самые вкусные кексы в Москве! Атмосфера просто волшебная, идеально для работы с ноутбуком.', rating: 5, date: '12.03.2026' },
  { name: 'Михаил В.', text: 'Кофе на высшем уровне. Раф лаванда — это любовь с первого глотка. Обязательно вернусь!', rating: 5, date: '15.03.2026' },
  { name: 'Елена К.', text: 'Очень уютно и инстаграмно. Десерты не только красивые, но и безумно вкусные. Рекомендую!', rating: 5, date: '18.03.2026' },
  { name: 'Дмитрий Л.', text: 'Быстрое обслуживание и всегда свежая выпечка. Отличное место для утреннего кофе.', rating: 4, date: '20.03.2026' },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1497933321188-941f9ad36b12?auto=format&fit=crop&q=80&w=800',
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroTitles = [
    "Твой идеальный момент начинается с Кекс&Coffee",
    "Авторские кексы и кофе, в которые влюбляются",
    "Уют, который согревает сердце в центре Москвы"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroTitles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3728] font-sans selection:bg-[#D4A373] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EAE0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
              <div className="w-10 h-10 bg-[#D4A373] rounded-full flex items-center justify-center text-white">
                <Coffee size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-[#4A3728]">Кекс&Coffee</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['О нас', 'Меню', 'Преимущества', 'Отзывы', 'Контакты'].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                  className="text-sm font-medium hover:text-[#D4A373] transition-colors"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('menu')}
                className="bg-[#D4A373] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#BC8A5F] transition-all shadow-lg shadow-[#D4A373]/20"
              >
                Заказать столик
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-[#EAE0D5] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {['О нас', 'Меню', 'Преимущества', 'Отзывы', 'Контакты'].map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                    className="block w-full text-left px-4 py-3 text-base font-medium hover:bg-[#FDFBF7] rounded-lg"
                  >
                    {item}
                  </button>
                ))}
                <div className="pt-4">
                  <button 
                    onClick={() => scrollTo('menu')}
                    className="w-full bg-[#D4A373] text-white px-6 py-3 rounded-full text-center font-semibold"
                  >
                    Заказать столик
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A373]/10 text-[#D4A373] text-xs font-bold uppercase tracking-wider mb-6">
                <Star size={14} fill="currentColor" />
                <span>Лучшая кофейня Москвы 2026</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[#2D1E17]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={heroIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="block"
                  >
                    {heroTitles[heroIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="text-lg text-[#6B5E51] mb-10 max-w-lg leading-relaxed">
                Погрузитесь в атмосферу тепла и уюта. Мы создаем десерты вручную и варим кофе, который вдохновляет на новые свершения.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollTo('меню')}
                  className="bg-[#D4A373] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#BC8A5F] transition-all flex items-center justify-center gap-2 group shadow-xl shadow-[#D4A373]/30"
                >
                  Посмотреть меню
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollTo('контакты')}
                  className="border-2 border-[#D4A373] text-[#D4A373] px-8 py-4 rounded-full text-lg font-bold hover:bg-[#D4A373] hover:text-white transition-all"
                >
                  Забронировать стол
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1000" 
                  alt="Coffee and Cupcake" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#EAE0D5] max-w-[200px] -rotate-6">
                <p className="text-sm font-bold mb-1">Свежее каждое утро</p>
                <p className="text-xs text-[#6B5E51]">Все наши кексы выпекаются за 2 часа до открытия</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-[#D4A373] text-white p-6 rounded-full shadow-xl rotate-12 flex flex-col items-center justify-center w-24 h-24">
                <span className="text-xs uppercase font-bold">Скидка</span>
                <span className="text-2xl font-black">-20%</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <Coffee size={400} className="text-[#D4A373] translate-x-1/2 -translate-y-1/4" />
        </div>
      </section>

      {/* About Section */}
      <section id="о-нас" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <img src={GALLERY_IMAGES[0]} alt="Interior" className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" />
              <img src={GALLERY_IMAGES[1]} alt="Dessert" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6 text-[#2D1E17]">История одного вдохновения</h2>
              <p className="text-lg text-[#6B5E51] mb-6 leading-relaxed">
                «Кекс&Coffee» — это не просто кофейня, это мечта, ставшая реальностью. Мы начали с маленькой домашней кухни, где экспериментировали с рецептами бабушкиных кексов, добавляя в них современные нотки.
              </p>
              <p className="text-lg text-[#6B5E51] mb-8 leading-relaxed">
                Сегодня мы — уютное пространство в центре Москвы, где каждый гость чувствует себя как дома. Наши ценности неизменны: исключительное качество ингредиентов, ручная работа и искренняя любовь к своему делу.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-bold text-[#D4A373] mb-1">5000+</p>
                  <p className="text-sm text-[#6B5E51] font-medium">Счастливых гостей в месяц</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#D4A373] mb-1">25+</p>
                  <p className="text-sm text-[#6B5E51] font-medium">Видов авторских кексов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="меню" className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-[#2D1E17]">Наше Меню</h2>
            <p className="text-[#6B5E51] max-w-2xl mx-auto">От классического эспрессо до экзотических десертов — мы собрали лучшее для вашего удовольствия.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Coffee Column */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE0D5]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#D4A373]/10 text-[#D4A373] rounded-xl">
                  <Coffee size={24} />
                </div>
                <h3 className="text-2xl font-bold">Кофе</h3>
              </div>
              <div className="space-y-6">
                {MENU_COFFEE.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-[#D4A373] transition-colors">{item.name}</h4>
                      <p className="text-sm text-[#6B5E51]">{item.description}</p>
                    </div>
                    <span className="font-bold text-[#D4A373]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tea Column */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE0D5]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#D4A373]/10 text-[#D4A373] rounded-xl">
                  <Send size={24} />
                </div>
                <h3 className="text-2xl font-bold">Чай</h3>
              </div>
              <div className="space-y-6">
                {MENU_TEA.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-[#D4A373] transition-colors">{item.name}</h4>
                      <p className="text-sm text-[#6B5E51]">{item.description}</p>
                    </div>
                    <span className="font-bold text-[#D4A373]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Drinks Column */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE0D5]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#D4A373]/10 text-[#D4A373] rounded-xl">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold">Напитки</h3>
              </div>
              <div className="space-y-6">
                {MENU_DRINKS.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-[#D4A373] transition-colors">{item.name}</h4>
                      <p className="text-sm text-[#6B5E51]">{item.description}</p>
                    </div>
                    <span className="font-bold text-[#D4A373]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakfast Column */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE0D5]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#D4A373]/10 text-[#D4A373] rounded-xl">
                  <Clock size={24} />
                </div>
                <h3 className="text-2xl font-bold">Завтраки</h3>
              </div>
              <div className="space-y-6">
                {MENU_BREAKFAST.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-[#D4A373] transition-colors">{item.name}</h4>
                      <p className="text-sm text-[#6B5E51]">{item.description}</p>
                    </div>
                    <span className="font-bold text-[#D4A373]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lunch Column */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE0D5]">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-[#D4A373]/10 text-[#D4A373] rounded-xl">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-2xl font-bold">Обеды</h3>
              </div>
              <div className="space-y-6">
                {MENU_LUNCH.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-[#D4A373] transition-colors">{item.name}</h4>
                      <p className="text-sm text-[#6B5E51]">{item.description}</p>
                    </div>
                    <span className="font-bold text-[#D4A373]">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#6B5E51] italic mb-6">* Цены указаны ориентировочно. Полное меню доступно в кофейне.</p>
            <button className="bg-[#4A3728] text-white px-10 py-4 rounded-full font-bold hover:bg-[#2D1E17] transition-all">
              Скачать полное меню (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="преимущества" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Clock />, title: 'Свежесть 100%', desc: 'Выпекаем десерты каждое утро, чтобы вы наслаждались идеальным вкусом.' },
              { icon: <Heart />, title: 'Авторские рецепты', desc: 'Уникальные сочетания, которые вы не найдете больше нигде в городе.' },
              { icon: <Zap />, title: 'Быстрый сервис', desc: 'Ценим ваше время. Приготовим ваш любимый кофе за 3 минуты.' },
              { icon: <CheckCircle2 />, title: 'Уютная атмосфера', desc: 'Идеальное место для встреч, работы или тихого отдыха.' },
            ].map((adv, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-[#FDFBF7] border border-[#EAE0D5] text-center"
              >
                <div className="w-16 h-16 bg-[#D4A373] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4A373]/20">
                  {React.cloneElement(adv.icon as React.ReactElement, { size: 32 })}
                </div>
                <h4 className="text-xl font-bold mb-3">{adv.title}</h4>
                <p className="text-sm text-[#6B5E51] leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Наш Инстаграмный Мир</h2>
            <p className="text-[#6B5E51]">Подписывайтесь на нас @keks_coffee_moscow</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-md"
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="отзывы" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Голоса наших гостей</h2>
            <div className="flex justify-center gap-1 text-[#D4A373]">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <p className="mt-2 text-[#6B5E51]">4.9/5 на основе 1000+ отзывов</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#FDFBF7] border border-[#EAE0D5] relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h5 className="font-bold text-lg">{review.name}</h5>
                    <p className="text-xs text-[#6B5E51]">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5 text-[#D4A373]">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-[#4A3728] leading-relaxed italic">"{review.text}"</p>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-[#EAE0D5]">
                  <Heart size={20} className="text-[#D4A373]" fill="#D4A373" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promos Section */}
      <section className="py-24 bg-[#4A3728] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Специальные предложения для тебя</h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-16 h-16 bg-[#D4A373] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Скидка на первый заказ</h4>
                    <p className="text-white/70">Покажи этот экран бариста и получи -15% на любой кекс и напиток.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="w-16 h-16 bg-[#D4A373] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Coffee size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Комбо "Утренний заряд"</h4>
                    <p className="text-white/70">Капучино + любой классический кекс всего за 350₽ до 11:00.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800" 
                alt="Promo" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728] via-transparent to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="контакты" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">Ждем тебя в гости</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDFBF7] rounded-xl flex items-center justify-center text-[#D4A373] flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Адрес</h5>
                    <p className="text-[#6B5E51]">посёлок дома отдыха Успенское, вл3с1</p>
                    <button className="text-[#D4A373] text-sm font-bold mt-2 hover:underline">Показать на карте</button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDFBF7] rounded-xl flex items-center justify-center text-[#D4A373] flex-shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Время работы</h5>
                    <p className="text-[#6B5E51]">Будни: 08:00 — 22:00</p>
                    <p className="text-[#6B5E51]">Выходные: 09:00 — 23:00</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDFBF7] rounded-xl flex items-center justify-center text-[#D4A373] flex-shrink-0">
                    <Send size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg mb-1">Связаться с нами</h5>
                    <p className="text-[#6B5E51] mb-2">+7 (991) 244-97-04</p>
                    <div className="flex gap-4 mt-3">
                      <button className="bg-[#25D366] text-white p-3 rounded-full hover:scale-110 transition-transform">
                        <Zap size={20} />
                      </button>
                      <button className="bg-[#0088cc] text-white p-3 rounded-full hover:scale-110 transition-transform">
                        <Send size={20} />
                      </button>
                      <button className="bg-[#E1306C] text-white p-3 rounded-full hover:scale-110 transition-transform">
                        <Instagram size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#EAE0D5]">
              <h4 className="text-2xl font-bold mb-6 text-center">Забронировать столик</h4>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full px-6 py-4 rounded-xl border border-[#EAE0D5] focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                />
                <input 
                  type="tel" 
                  placeholder="Номер телефона" 
                  className="w-full px-6 py-4 rounded-xl border border-[#EAE0D5] focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    className="w-full px-6 py-4 rounded-xl border border-[#EAE0D5] focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                  />
                  <input 
                    type="time" 
                    className="w-full px-6 py-4 rounded-xl border border-[#EAE0D5] focus:outline-none focus:ring-2 focus:ring-[#D4A373] bg-white"
                  />
                </div>
                <button className="w-full bg-[#D4A373] text-white py-4 rounded-xl font-bold hover:bg-[#BC8A5F] transition-all shadow-lg shadow-[#D4A373]/20">
                  Отправить заявку
                </button>
              </form>
              <p className="text-xs text-[#6B5E51] text-center mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] py-12 border-t border-[#EAE0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4A373] rounded-full flex items-center justify-center text-white">
                <Coffee size={18} />
              </div>
              <span className="text-xl font-bold tracking-tighter text-[#4A3728]">Кекс&Coffee</span>
            </div>
            <div className="flex gap-8 text-sm text-[#6B5E51]">
              <button className="hover:text-[#D4A373]">Политика конфиденциальности</button>
              <button className="hover:text-[#D4A373]">Оферта</button>
              <button className="hover:text-[#D4A373]">Карта сайта</button>
            </div>
            <p className="text-sm text-[#6B5E51]">© 2026 Кекс&Coffee. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Strategy / Additional Info Modal (Optional, but good for user request) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => alert("Стратегия продвижения:\n\n1. УТП:\n- Кексы по рецептам 19 века в современной интерпретации.\n- Кофе-сет 'Кекс-Тест': 3 мини-кекса и эспрессо.\n- 'Инстаграмный' интерьер, созданный для контента.\n\n2. ЦА:\n- Офисные сотрудники (25-40 лет) - завтраки и перерывы.\n- Студенты и фрилансеры - работа в уютной обстановке.\n- Блогеры и любители эстетики - за красивыми фото.\n\n3. Instagram идеи:\n- Reels с процессом выпекания (ASMR).\n- Конкурс на лучший отзыв в сторис.\n- Рубрика 'Кекс недели' с голосованием.")}
          className="bg-[#4A3728] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          title="Стратегия и УТП"
        >
          <Zap size={24} />
        </button>
      </div>
    </div>
  );
}
