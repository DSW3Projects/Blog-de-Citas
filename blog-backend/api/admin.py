from django.contrib import admin
from django.contrib.auth.models import User
from .models import Blog, Review, Comment, Profile

# Admin para Blog
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'content', 'author__username')
    list_filter = ('created_at',)

# Admin para Review
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('blog', 'reviewer', 'created_at')
    search_fields = ('blog__title', 'reviewer__username')

# Admin para Comment
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('review', 'commenter', 'created_at')
    search_fields = ('review__blog__title', 'commenter__username', 'content')
    list_filter = ('created_at',)


# Opcional: Extender el admin de User para mostrar perfiles relacionados
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Perfiles'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)


