from django.urls import path

from . import views

urlpatterns = [
    path('recommend/', views.RecommendedAnnouncement.as_view()),
    path('search/<query>', views.SearchAnnouncement.as_view()),
    path('create_announcement/', views.CreateAnnouncement.as_view()),
    path('<int:id>/', views.GetAnnouncement.as_view())
]
