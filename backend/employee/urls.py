from django.urls import path
from employee.views import DepartmentAPI,ProjectAPI,EmployeeAPI,TaskAPI
urlpatterns = [
    path('dep/',DepartmentAPI.as_view(), name='department'),
    path('dep/<int:pk>/',DepartmentAPI.as_view(), name='department'),
    path('project/',ProjectAPI.as_view(), name='project'),
    path('project/<int:pk>/',ProjectAPI.as_view(),name='project'),
    path('emp/',EmployeeAPI.as_view(), name='employee'),
    path('emp/<int:pk>/',EmployeeAPI.as_view(),name='employee'),
    path('emp/',TaskAPI.as_view(), name='task'),
    path('emp/<int:pk>/',TaskAPI.as_view(),name='task'),
        
]
