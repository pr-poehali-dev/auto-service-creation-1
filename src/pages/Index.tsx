import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  { id: 1, name: 'Диагностика автомобиля', price: '1500 ₽', description: 'Комплексная диагностика всех систем', icon: 'Search' },
  { id: 2, name: 'Замена масла', price: 'от 2000 ₽', description: 'Замена масла и масляного фильтра', icon: 'Droplet' },
  { id: 3, name: 'Ремонт двигателя', price: 'от 15000 ₽', description: 'Капитальный и текущий ремонт', icon: 'Cog' },
  { id: 4, name: 'Ремонт подвески', price: 'от 5000 ₽', description: 'Диагностика и ремонт ходовой части', icon: 'Settings' },
  { id: 5, name: 'Шиномонтаж', price: 'от 1200 ₽', description: 'Сезонная замена и балансировка', icon: 'CircleDot' },
  { id: 6, name: 'Кузовной ремонт', price: 'от 8000 ₽', description: 'Устранение повреждений кузова', icon: 'Car' },
];

const advantages = [
  { icon: 'Award', title: 'Опыт 15+ лет', description: 'Профессиональные мастера' },
  { icon: 'Clock', title: 'Быстро', description: 'Выполняем работы в срок' },
  { icon: 'Shield', title: 'Гарантия', description: 'На все виды работ' },
  { icon: 'Wrench', title: 'Оборудование', description: 'Современное оснащение' },
];

export default function Index() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения записи.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Car" size={32} />
            <span className="text-2xl font-bold">АвтоМастер</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="hover:text-accent transition-colors">Услуги</a>
            <a href="#prices" className="hover:text-accent transition-colors">Цены</a>
            <a href="#about" className="hover:text-accent transition-colors">О нас</a>
            <a href="#contacts" className="hover:text-accent transition-colors">Контакты</a>
          </nav>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Онлайн-запись на обслуживание</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы свяжемся с вами для подтверждения записи
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Услуга *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map(service => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="car">Марка автомобиля</Label>
                    <Input id="car" placeholder="Toyota Camry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Год выпуска</Label>
                    <Input id="year" placeholder="2020" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Выберите дату</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Время *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="12:00">12:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Input id="comment" placeholder="Дополнительная информация" />
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://cdn.poehali.dev/projects/0d7c50d0-9a9a-45ea-b91b-21f85525c263/files/38f45a07-ae88-476a-acec-c8d360121be5.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Профессиональный ремонт<br />вашего автомобиля
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            15 лет опыта • Гарантия качества • Современное оборудование
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-6">
                Записаться на обслуживание
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {advantages.map((adv, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="pt-6">
                  <Icon name={adv.icon} size={48} className="mx-auto mb-4 text-accent" />
                  <h3 className="font-bold text-lg mb-2">{adv.title}</h3>
                  <p className="text-muted-foreground">{adv.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Полный спектр услуг по ремонту и обслуживанию автомобилей
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover-scale">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Icon name={service.icon} size={32} className="text-accent" />
                    </div>
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="text-accent font-semibold text-lg">
                        {service.price}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Цены</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Прозрачное ценообразование без скрытых платежей
          </p>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="p-0">
              <div className="divide-y">
                {services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center p-6 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Icon name={service.icon} size={24} className="text-accent" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <span className="font-bold text-lg text-accent">{service.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <p className="text-center text-muted-foreground mt-8">
            * Точная стоимость определяется после диагностики
          </p>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Автосервис "АвтоМастер" работает с 2009 года. За это время мы обслужили более 10 000 автомобилей 
              и заслужили репутацию надежного партнера для автовладельцев.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Наша команда состоит из сертифицированных специалистов с опытом работы от 5 лет. 
              Мы используем только качественные запчасти и современное диагностическое оборудование.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">15+</div>
                <div className="text-muted-foreground">лет на рынке</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">10 000+</div>
                <div className="text-muted-foreground">обслуженных авто</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <div className="text-muted-foreground">довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="MapPin" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Автомобильная, д. 123</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="Phone" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                <p className="text-muted-foreground">+7 (495) 765-43-21</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Icon name="Clock" size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="font-bold mb-2">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-muted-foreground">Сб-Вс: 10:00 - 18:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Car" size={28} />
            <span className="text-xl font-bold">АвтоМастер</span>
          </div>
          <p className="text-gray-300 mb-2">Профессиональный ремонт автомобилей с 2009 года</p>
          <p className="text-gray-400 text-sm">© 2024 АвтоМастер. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
