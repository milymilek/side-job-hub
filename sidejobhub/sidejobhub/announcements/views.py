from django.shortcuts import render

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import AnnouncementSerializer
from .models import Announcement


class CreateAnnouncement(APIView):
    def post(self, request):
        serializer = AnnouncementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecommendedAnnouncement(APIView):
    def get(self, request):
        announcement_reco = Announcement.objects.order_by('?')
        serializer = AnnouncementSerializer(announcement_reco, many=True)
        return Response(serializer.data)


class SearchAnnouncement(APIView):
    def get(self, request):
        announcement_reco = Announcement.objects.filter(title__contains=request.data['query'])
        serializer = AnnouncementSerializer(announcement_reco, many=True)
        return Response(serializer.data)


class GetAnnouncement(APIView):
    def get(self, request, *args, **kwargs):
        announcement_id = kwargs.get('id')
        announcement_reco = Announcement.objects.filter(id=announcement_id).first()
        serializer = AnnouncementSerializer(announcement_reco, many=False)
        return Response(serializer.data)


# TODO: sprobowac przerobić viewy na ten styl
# class DetailAnnouncement(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Announcement.objects.all()#get(title='glazurnik')
#     serializer_class = AnnouncementSerializer
