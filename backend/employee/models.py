from django.db import models

STATUS_TYPE = (
    ('PROGRESS', 'Progress'),
    ('COMPLETED', 'COMPLETE')
)


class Employee(models.Model):
    password = models.CharField(max_length=100)
    password2 = models.CharField(max_length=100)

    email = models.EmailField(verbose_name='Email',
                              max_length=255, unique=True,)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField(max_length=200)
    gender = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    department = models.ForeignKey(
        "Department", blank=True, null=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="", null=True, blank=True)
    file = models.FileField(upload_to="files/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name


class Department(models.Model):
    name = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    members = models.ManyToManyField(
        "Employee", blank=True, related_name='project_employee')
    manager = models.ForeignKey("Employee", related_name='project_manager',
                                blank=True, null=True, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    project = models.ForeignKey(
        "Project", blank=True, null=True, on_delete=models.CASCADE)
    add = models.CharField(max_length=300)
    employee = models.ForeignKey(
        "Employee", on_delete=models.CASCADE, null=True)
    status = models.CharField(
        choices=STATUS_TYPE, default='START', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class DepartmentManager(models.Model):
    manager = models.ForeignKey(
        "Employee", blank=True, related_name='members', on_delete=models.DO_NOTHING)
    department = models.ForeignKey(
        "Department", related_name='department_manager', blank=True, null=True, on_delete=models.DO_NOTHING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.manager)
