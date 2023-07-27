from django.contrib import admin
from employee.models import Department, Project, Employee, Task, DepartmentManager


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    list_filter = ('name',)
    search_fields = ('name', 'id',)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'manager')
    list_filter = ('name',)
    search_fields = ('name', 'id',)


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'gender', 'date_of_birth', 'city',
                    'country', 'phone', 'degree', 'department', 'image', 'file', 'password')
    list_filter = ('first_name',)
    search_fields = ('first_name', 'id',)

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'gender', 'phone', 'address', 'password1', 'password2', 'image', 'date_of_birth', 'degree', 'country', 'city'),
        }),
    )


class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'add', 'status',)
    list_filter = ('id',)
    search_fields = ('id',)


class DepartmentManagerAdmin(admin.ModelAdmin):
    list_display = ('id', 'department', 'manager',)
    list_filter = ('id',)

# Now register the new UserAdmin...


admin.site.register(Department, DepartmentAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(DepartmentManager, DepartmentManagerAdmin)
