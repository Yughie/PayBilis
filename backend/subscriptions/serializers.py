from rest_framework import serializers
from django.db import transaction

from .models import Biller, Subscription


class BillerSerializer(serializers.ModelSerializer):
    billerName = serializers.CharField(source='biller_name')
    accountNumber = serializers.CharField(source='account_number')
    accountName = serializers.CharField(source='account_name')
    estimatedAmount = serializers.DecimalField(
        source='estimated_amount', max_digits=12, decimal_places=2)
    collectionDate = serializers.CharField(source='collection_date')

    class Meta:
        model = Biller
        fields = (
            'id',
            'billerName',
            'accountNumber',
            'accountName',
            'estimatedAmount',
            'collectionDate',
        )


class SubscriptionSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='full_name')
    contactNumber = serializers.CharField(source='contact_number')
    houseAddress = serializers.CharField(source='house_address')
    billers = BillerSerializer(many=True)

    class Meta:
        model = Subscription
        fields = (
            'id',
            'fullName',
            'contactNumber',
            'houseAddress',
            'frequency',
            'billers',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        billers_data = validated_data.pop('billers', [])

        with transaction.atomic():
            subscription = Subscription.objects.create(**validated_data)
            for biller_data in billers_data:
                Biller.objects.create(subscription=subscription, **biller_data)

        return subscription
