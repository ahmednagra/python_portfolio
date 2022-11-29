from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('portfolio', views.portfo, name='portfolio'),
    path('portfolio_s', views.portfolio_s, name='portfolio-single'),
    path('blog', views.blog, name='blog'),
    path('blog-s', views.blog_s, name='blog-s'),
    path('contact', views.contact, name='contact'),

]
