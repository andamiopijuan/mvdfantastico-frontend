from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from .models import AboutContent, TeamMember, Partner
from .serializers import (
    AboutContentSerializer,
    TeamMemberSerializer,
    PartnerSerializer,
    ContactMessageCreateSerializer,
)


class AboutContentView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = AboutContentSerializer

    def get_object(self):
        return AboutContent.objects.first()


class TeamMemberListView(generics.ListAPIView):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AllowAny]


class PartnerListView(generics.ListAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        partner_type = self.request.query_params.get("type")
        qs = Partner.objects.all()
        if partner_type:
            qs = qs.filter(partner_type=partner_type)
        return qs


class ContactMessageCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageCreateSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save()
            contact_email = getattr(settings, "CONTACT_EMAIL", None)
            if contact_email:
                try:
                    send_mail(
                        subject=f"[MVF Contacto] Mensaje de {msg.name}",
                        message=f"Nombre: {msg.name}\nEmail: {msg.email}\n\n{msg.message}",
                        from_email=getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@montevideofantastico.com"),
                        recipient_list=[contact_email],
                        fail_silently=True,
                    )
                except Exception:
                    pass
            return Response(
                {"detail": "Message sent successfully."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
