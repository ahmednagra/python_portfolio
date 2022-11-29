from django.shortcuts import render

# from django.contrib.auth.models import User

# ab post ko listview daikhny k liya


# dummy data a list comprises many dictionaries  list of posts
"""postsss = [
    {
        'author' : 'ahmed',
        'title'  :  'blog post 1',
        'content' : 'first post content',
        'date_posted' : 'April 27, 2002'
    }, 
    {
        'author' : 'Ali',
        'title'  :  'blog post 2',
        'content' : 'Seccond post content',
        'date_posted' : 'June 27, 2022'
    }
]
"""


# Create your views here.
def home(request):
    return render(request, "web_app/index.html")


def about(request):
    return render(request, "web_app/about.html")


def portfo(request):
    return render(request, "web_app/portfolio.html")


def portfolio_s(request):
    return render(request, "web_app/portfolio-single.html")


def blog(request):
    return render(request, "web_app/blog.html")


def blog_s(request):
    return render(request, "web_app/blog-single.html")


def contact(request):
    return render(request, "web_app/contact.html")


"""
class PostListView(ListView):
    model = post
    template_name = 'appblog/home.html'   
    context_object_name = 'posts'
    ordering = ['-date_posted']  # ( - ) se ab date lastest oper aur older neachy 
    paginate_by = 3     # for pagination
    queryset = post.objects.all()  # Default: Model.objects.all()

class UserPostListView(ListView):
    model = post
    template_name = 'appblog/user_post.html'   
    context_object_name = 'posts'
    paginate_by = 3     # for pagination
    
    def get_queryset(self):
        user =get_object_or_404(User, username=self.kwargs.get('username'))
        return post.objects.filter(author=user).order_by('-date_posted')
        
    
class PostDetailView(DetailView):
    model = post

class PostCreateView(LoginRequiredMixin, CreateView): # just mention the fields that we required in form
    model = post    
    fields = ['title', 'content']

    def form_valid(self, form):  # automatically author ki id post se link ho join ge
        form.instance.author = self.request.user
        return super().form_valid(form)

class PostUpdateView(LoginRequiredMixin,UserPassesTestMixin, UpdateView): # just mention the fields that we required in form
    model = post    
    fields = ['title', 'content']

    def form_valid(self, form):  # automatically author ki id post se link ho join ge
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False  

class PostDeleteView(LoginRequiredMixin,UserPassesTestMixin, DeleteView):
    model = post
    success_url = '/'

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        else:
            return False


def about(request):
    return render(request, 'appblog/about.html', {'title': 'About'})"""
