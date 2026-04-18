from django.urls import path
from .views import (
    AboutContentView,
    TeamMemberListView,
    PartnerListView,
    ContactMessageCreateView,
)

urlpatterns = [
    path("about/", AboutContentView.as_view(), name="about"),
    path("team/", TeamMemberListView.as_view(), name="team"),
    path("partners/", PartnerListView.as_view(), name="partners"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
]
