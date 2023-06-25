from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
class UserModelAdmin(BaseUserAdmin):
    list_display = ('id','email', 'first_name','last_name','gender','phone','address','image', 'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name','last_name','gender','phone','address','image')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name','gender','phone','address' 'password1', 'password2','image'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email','id',)
    filter_horizontal = ()

# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)

