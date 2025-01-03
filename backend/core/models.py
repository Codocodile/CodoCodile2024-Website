from django.contrib.auth.models import User
from django.db import models


class Challenger(models.Model):
    STATUS_CHOICES = (
        ("J", "Junior"),
        ("S", "Senior"),
        ("P", "Pro"),
    )
    GENDER_CHOICES = (
        ("M", "Male"),
        ("F", "Female"),
    )
    SHIRT_SIZE_CHOICES = (
        ("S", "Small"),
        ("M", "Medium"),
        ("L", "Large"),
        ("XL", "Extra Large"),
        ("XXL", "Extra Extra Large"),
        ("XXXL", "Extra Extra Extra Large"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name_persian = models.CharField(max_length=50)
    last_name_persian = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=11)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default='M')
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='J')
    profile_pic = models.ImageField(upload_to='profile_pics', blank=True)
    bio = models.TextField(max_length=500, blank=True)
    university = models.TextField(max_length=100, blank=True)
    national_code = models.TextField(max_length=10, blank=True)
    confirmation_code = models.CharField(max_length=5, blank=True)
    is_confirmed = models.BooleanField(default=False)
    password_reset_code = models.CharField(max_length=20, blank=True)
    cv_file = models.FileField(upload_to='cv_uploads/', blank=True)
    shirt_size = models.CharField(max_length=4, choices=SHIRT_SIZE_CHOICES, blank=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} {self.get_status_display()}'


class Group(models.Model):
    STATUS_CHOICES = (
        ("J", "Junior"),
        ("S", "Senior"),
        ("P", "Pro"),
    )
    
    
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=500, blank=True)
    judge_username = models.TextField(max_length=50, blank=True)
    judge_password = models.TextField(max_length=50, blank=True)
    level = models.CharField(max_length=1, choices=STATUS_CHOICES, default='J')
    
    def update_level(self):
        members = Membership.objects.filter(group=self, status='A')
        if members.count() == 2:
            levels = {"J": 1, "S": 2, "P": 3}
            if levels.get(members[0].challenger.status, 1) > levels.get(members[1].challenger.status, 1):
                self.level = members[0].challenger.status
            else:
                self.level = members[1].challenger.status
            self.save()
        if members.count() == 1:
            self.level = members[0].challenger.status
            self.save()
    
    def __str__(self):
        return f'{self.name}'


class Membership(models.Model):
    STATUS_CHOICES = (
        ("A", "Accepted"),
        ("P", "Pending"),
        ("R", "Rejected"),
    )
    ROLES_CHOICES = (
        ("M", "Member"),
        ("L", "Leader"),
    )

    challenger = models.ForeignKey(Challenger, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=ROLES_CHOICES,
                            blank=True, default='M')
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, blank=True, default='P')

    def __str__(self):
        return f'{self.challenger} {self.group} {self.get_status_display()} {self.get_role_display()}'
    

class Visit(models.Model):
    url = models.CharField(max_length=512)
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f'{self.url}'
    