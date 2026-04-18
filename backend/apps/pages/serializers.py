from rest_framework import serializers
from .models import AboutContent, TeamMember, Partner, ContactMessage


class AboutContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutContent
        fields = ["history", "mission", "philosophy", "updated_at"]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "photo", "bio", "order"]


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ["id", "name", "logo", "url", "partner_type", "order"]


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]

    def validate_email(self, value):
        # Basic sanity check — serializer already validates format
        if len(value) > 254:
            raise serializers.ValidationError("Email address is too long.")
        return value
