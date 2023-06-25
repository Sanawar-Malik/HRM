from rest_framework import serializers
from employee.models import Department,Project, Employee,Task
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
#    department = DepartmentSerializer()
    class Meta:
        model = Employee
        fields ='__all__'


class TaskSerializer(serializers.ModelSerializer):
#    department = DepartmentSerializer()
    class Meta:
        model = Task
        fields ='__all__'


