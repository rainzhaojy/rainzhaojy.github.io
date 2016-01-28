---
layout: post
title: C++中的字符串类型
tag: misc
---

C++提供了ASCII码字符的数据类型和字符串处理函数，也定义了一组宽字符版本的数据类型和字符串处理函数:

* char[], char*, string - ASCII字符类型，一个字符为一个字节
* wchar_t[], wchar_t*, wstring - 宽字符类型，一个字符一般为2个字节
* TCHAR[], TCHAR* - 根据是否定义了UNICODE宏，分别对应wchar_t或char

宽字符类型的示例定义:

```c
typedef unsigned short wchar_t;
typedef basic_string<char> string;
typedef basic_string<wchar_t> wstring;
#ifdef UNICODE 
    typedef char TCHAR;
    #define _T(x) x
#else 
    typede wchar_t TCHAR; 
    #define _T(x) L##x
#endif
```

使用TCHAR和_T似乎保持了灵活性，但绝大多数的程序都是要支持国际化的，因此，建议直接使用wchar_t/wstring等来处理字符串。

C++和Java不同，C++并没有规定程序处理的所有字符串是unicode的，C++只是提供了宽字符版本的数据类型，类库和函数，在wchar_t*里你可能放的是GBK编码的字符，也可能放的是unicode编码的字符，只要字符串处理时保证字符正确就可以了，但一般来说，建议使用unicode。

C++实现I18N也有一些best practice和类库，譬如类库ICU。

更多阅读:

* <http://www.i18nguy.com/unicode/c-unicode.zh-CN.html> - 使你的C/C++代码支持Unicode
* <http://stackoverflow.com/questions/195497/resources-for-i18n-in-c> - I18N in C++
* <http://blog.csdn.net/daiyutage/article/details/8604720> - 深入 char * ,char ** ,char a[] ,char *a[]
* <http://www.cppblog.com/lf426/archive/2010/06/25/118707.html> - 彻底解密C++宽字符