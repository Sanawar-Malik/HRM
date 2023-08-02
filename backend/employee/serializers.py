from rest_framework import serializers
from employee.models import Department, Project, Employee, Task
from rest_framework.serializers import ValidationError


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Employee
        fields = ['email', 'id', 'first_name', 'last_name', 'gender', 'country', 'city',
                  'phone', 'address', 'image', 'password', 'password2', 'file', 'date_of_birth', 'degree']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                'Password and confirm Password does not match')
        return attrs

    # def create(self, validate_data):
    #     return Employee.objects.create_employee(**validate_data)
    #


class TaskSerializer(serializers.ModelSerializer):
    #    department = DepartmentSerializer()
    class Meta:
        model = Task
        fields = '__all__'
