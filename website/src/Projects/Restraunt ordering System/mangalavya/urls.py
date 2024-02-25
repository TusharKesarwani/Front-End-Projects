from . import views
from django.urls import path
urlpatterns=[
    path('',views.index,name='index.html'),
    path('home',views.index,name='index.html'),
    path('data',views.datatable,name='table-datatable.html'),
    path('profile',views.profile,name='app-profile.html'),
    path('form',views.formedit,name='form-validation.html'),
    path('404',views.page404,name='page-error-404.html'),
    path('403',views.page403,name='page-error-403.html'),
    path('400',views.page400,name='page-error-400.html'),
    path('500',views.page500,name='page-error-500.html'),
    path('503',views.page503,name='page-error-503.html'),
    path('lock',views.pagelock,name='page-lock.html'),
    path('login',views.login,name='page-login.html'),
    path('logout',views.logout,name='page-logout.html'),
    path('register',views.signup,name='page-register.html'),
    path('index2',views.index2,name='index2.html'),
    path('holo1',views.holo1,name='holo1.html'),
    path('holo2',views.holo2,name='holo2.html'),
    path('holo3',views.holo3,name='holo3.html'),
    path('holo4',views.holo4,name='holo4.html'),
    path('holo5',views.holo5,name='holo5.html'),
    path('holo6',views.holo6,name='holo6.html'),
    path('holo7',views.holo7,name='holo7.html'),
    path('holo8',views.holo8,name='holo8.html')


]