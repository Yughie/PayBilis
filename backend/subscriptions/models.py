from django.db import models


class Subscription(models.Model):
    FREQUENCY_CHOICES = [
        ('One-time', 'One-time'),
        ('Monthly Subscription', 'Monthly Subscription'),
    ]

    full_name = models.CharField(max_length=150)
    contact_number = models.CharField(max_length=30)
    house_address = models.CharField(max_length=255)
    frequency = models.CharField(max_length=32, choices=FREQUENCY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.full_name


class Biller(models.Model):
    COLLECTION_DATE_CHOICES = [
        ('Every 1st', 'Every 1st'),
        ('Every 5th', 'Every 5th'),
        ('Every 10th', 'Every 10th'),
        ('Every 15th', 'Every 15th'),
        ('Every 20th', 'Every 20th'),
        ('Every 25th', 'Every 25th'),
        ('Every 30th', 'Every 30th'),
    ]

    subscription = models.ForeignKey(
        Subscription, related_name='billers', on_delete=models.CASCADE)
    biller_name = models.CharField(max_length=150)
    account_number = models.CharField(max_length=80)
    account_name = models.CharField(max_length=150)
    estimated_amount = models.DecimalField(max_digits=12, decimal_places=2)
    collection_date = models.CharField(
        max_length=32, choices=COLLECTION_DATE_CHOICES)

    def __str__(self) -> str:
        return f'{self.biller_name} - {self.subscription.full_name}'
