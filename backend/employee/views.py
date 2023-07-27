from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from employee.serializers import DepartmentSerializer, ProjectSerializer, EmployeeSerializer, TaskSerializer
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.exceptions import NotFound
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from .models import Department, Project, Employee, Task
#  Generate token Manually


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refreh": str(refresh),
        'access': str(refresh.access_token),
    }
# -------- Views Department--------------


class DepartmentAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, formate=None):
        id = pk
        if id is not None:
            dep = Department.objects.get(id=id)
          # print(emo)
            serializer = DepartmentSerializer(dep)
            return Response(serializer.data, status=status.HTTP_200_OK)

        dep = Department.objects.all()
      # emo = [department_manager.hod for department_manager in dep]
        serializer = DepartmentSerializer(dep, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# ---------Create Department -----------------

    def post(self, request, format=None):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Department Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)


# ------------Update Department----------------


    def put(self, request, pk, formate=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Department update completely'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Department update completely'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# ------------Delete Department------------------

    def delete(self, request, pk, formate=None):
        id = pk
        dep = Department.objects.get(pk=id)
        serializer = DepartmentSerializer(dep, data=request.data)
        dep.delete()
        return Response({'msg': 'Department delete completely'})


class ProjectAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, formate=None):
        id = pk
        if id is not None:
            project = Project.objects.get(id=id)
            serializer = ProjectSerializer(project)
            return Response(serializer.data, status=status.HTTP_200_OK)
        project = Project.objects.all()
        serializer = ProjectSerializer(project, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Project-----------------------

    def post(self, request, formate=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Project Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Project-----------------------
    def put(self, request, pk, formate=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(
            project, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Project-----------------------

    def delete(self, request, pk, formate=None):
        id = pk
        project = Project.objects.get(pk=id)
        serializer = ProjectSerializer(project, data=request.data)
        project.delete()
        return Response({'msg': 'Project Delete Completely'})


class EmployeeAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

    def get(self, request, pk=None, formate=None):
        id = pk
        if id is not None:
            emp = Employee.objects.get(id=id)
            serializer = EmployeeSerializer(emp)
            return Response(serializer.data, status=status.HTTP_200_OK)
        emp = Employee.objects.all()
        serializer = EmployeeSerializer(emp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Employee-----------------------

    def post(self, request, formate=None):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            employee = serializer.save()
            token = get_tokens_for_user(employee)
            return Response({'token': token, 'msg': 'Employee Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Employee---------------------------------------------
    def put(self, request, pk, formate=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Employee-----------------------

    def delete(self, request, pk, formate=None):
        id = pk
        emp = Employee.objects.get(pk=id)
        serializer = EmployeeSerializer(emp, data=request.data)
        emp.delete()
        return Response({'msg': 'Employee Delete Completely'})


class TaskAPI(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, formate=None):
        id = pk
        if id is not None:
            task = Task.objects.get(id=id)
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        task = Task.objects.all()
        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# -------------Create Task-----------------------

    def post(self, request, formate=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Task Create Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

# --------------Update Task-----------------------
    def put(self, request, pk, formate=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Completely data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)

    def patch(self, request, pk, formate=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Partial Data Update'})
        return Response(serializer.errors, status=status.HTTP_400_Bad_Request)
# -----------------Delete Task-----------------------

    def delete(self, request, pk, formate=None):
        id = pk
        task = Task.objects.get(pk=id)
        serializer = TaskSerializer(task, data=request.data)
        task.delete()
        return Response({'msg': 'Task Delete Completely'})
