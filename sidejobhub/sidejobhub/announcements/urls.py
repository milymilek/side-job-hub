from django.urls import path

from . import views

urlpatterns = [
    path('recommend/', views.RecommendedAnnouncement.as_view()),
    #path('search/<int:pk>/', views.SearchAnnouncement.as_view()),
    path('search/', views.SearchAnnouncement.as_view()),
    path('create_announcement/', views.CreateAnnouncement.as_view()),
]
