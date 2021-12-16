## 自定义Mybatis
图片展示了以下自定义MyBatis实现的逻辑流程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/66af00a3747f4db7885ff784815dd72d.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcmVtYXJrYWJsZV8yOQ==,size_20,color_FFFFFF,t_70,g_se,x_16)
在开始写代码之前，我们首先要理解MyBatis的功能是什么？实现这些功能需要哪些原始数据？

> MyBatis是一种持久层框架，能够简化数据库操作流程。只需要通过接口指定数据操作的抽象方法（具体实现由动态代理完成），配置SQL语句以及连接数据库的必要信息即可完成。

Mybatis中的配置可以分为两个部分：
第一个部分为数据库连接的配置
第二个部分为Mapper配置

对于数据库的配置主要是**Connection**的配置，Mapper的配置是将方法与sql语句进行匹配，因此在Mapper中我们需要获取**方法名称**以及**返回类型**，并利用执行**sql语句**对该方法进行动态代理完成增强。
![在这里插入图片描述](https://img-blog.csdnimg.cn/108c327dbc5a47d389ce363403610299.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcmVtYXJrYWJsZV8yOQ==,size_18,color_FFFFFF,t_70,g_se,x_16)


我们创建一个Configuration类，用于存储配置解析后的数据。
成员变量包括数据库连接所需要的四个属性driver，url，username以及password，以及包含方法名，返回类型以及sql语句的mapper。其中，Map<String,Mapper> mapper中，key表示全限定方法名，value又为另一个Map<String,String>, key表示sql语句，value表示返回类型。

```java
public class Configuration {

    private String driver;
    private String url;
    private String username;
    private String password;

    private Map<String,Mapper> mappers = new HashMap<String,Mapper>();

    public Map<String, Mapper> getMappers() {
        return mappers;
    }

    public void setMappers(Map<String, Mapper> mappers) {
        this.mappers.putAll(mappers);
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

```java
public class Mapper {
    private String queryString;
    private String resultType;
    
    public String getQueryString() {
        return queryString;
    }
    public void setQueryString(String queryString) {
        this.queryString = queryString;
    }
    public String getResultType() {
        return resultType;
    }
    public void setResultType(String resultType) {
        this.resultType = resultType;
    }
}
```

首先对配置进行解析，我们以xml为例：
```java
<?xml version="1.0" encoding="UTF-8"?>
<!-- mybatis的主配置文件 -->
<configuration>
    <!-- 配置环境 -->
    <environments default="mysql">
        <!-- 配置mysql的环境-->
        <environment id="mysql">
            <!-- 配置事务的类型-->
            <transactionManager type="JDBC"></transactionManager>
            <!-- 配置数据源（连接池） -->
            <dataSource type="POOLED">
                <!-- 配置连接数据库的4个基本信息 -->
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/eesy"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 指定映射配置文件的位置，映射配置文件指的是每个dao独立的配置文件 -->
    <mappers>
        <mapper resource="org/example/dao/IUserDao.xml"/>
        <!--<mapper class="org.example.dao.IUserDao"/>-->
    </mappers>
</configuration>
```
XML：
IUserDao.xml
```java
<?xml version="1.0" encoding="UTF-8"?>
<mapper namespace="org.example.dao.IUserDao">
    <!--配置查询所有-->
    <select id="findAll" resultType="org.example.domain.User">
        select * from user
    </select>
    <select id="findUserByName" resultType="org.example.domain.User">
        select * from user where username = ?
    </select>
</mapper>
```
Annotation：

```java
public interface IUserDao {
    @Select("select * from user")
    List<User> findAll();
	@Select("select * from user where username = #{name}")
	List<User> findUserByName(@Param("name") String name);
}
```

对于数据库连接，我们需要driver，url，username以及password四个属性, 四个属性都放在xml文件的property标签里
对于Mapper，我们需要方法名，返回类型以及sql语句，采用xml配置时三者都在IUserDao.xml的mapper标签内，方法名=namespace+id，返回类型=resultType，sql语句在select标签内，因此我们通过如下代码进行解析：

解析四个属性：
```java
Configuration cfg = new Configuration();
 //1.获取SAXReader对象
 SAXReader reader = new SAXReader();
 //2.根据字节输入流获取Document对象
 Document document = reader.read(config);//（InputStream类型）
 //3.获取根节点
 Element root = document.getRootElement();
 //4.使用xpath中选择指定节点的方式，获取所有property节点
 List<Element> propertyElements = root.selectNodes("//property");
 //5.遍历节点
 for(Element propertyElement : propertyElements){
     String name = propertyElement.attributeValue("name");
     if("driver".equals(name)){
         String driver = propertyElement.attributeValue("value");
         cfg.setDriver(driver);
     }
     if("url".equals(name)){
         String url = propertyElement.attributeValue("value");
         cfg.setUrl(url);
     }
     if("username".equals(name)){
         String username = propertyElement.attributeValue("value");
         cfg.setUsername(username);
     }
     if("password".equals(name)){
         String password = propertyElement.attributeValue("value");
         cfg.setPassword(password);
     }
```

解析mapper：
```java
List<Element> mapperElements = root.selectNodes("//mappers/mapper");
for(Element mapperElement : mapperElements){
    Attribute attribute = mapperElement.attribute("resource");
    if(attribute != null){
        //表示有resource属性，用的是XML
        String mapperPath = attribute.getValue();
        Map<String, Mapper> mappers = loadMapperConfiguration(mapperPath);
        cfg.setMappers(mappers);
    }else{
        System.out.println("使用的是注解");
        //表示没有resource属性，用的是注解
        String daoClassPath = mapperElement.attributeValue("class");
        Map<String,Mapper> mappers = loadMapperAnnotation(daoClassPath);
        cfg.setMappers(mappers);
    }
```
解析mapper时，我们对xml以及注解两种方式都进行了处理

loadMapperConfiguration（xml配置）

```java
private static Map<String,Mapper> loadMapperConfiguration(String mapperPath)throws IOException {
        InputStream in = null;
        try{
            Map<String,Mapper> mappers = new HashMap<String,Mapper>();
            in = Resources.getResourceAsStream(mapperPath);
            //2.根据字节输入流获取Document对象
            SAXReader reader = new SAXReader();
            Document document = reader.read(in);
            //3.获取根节点
            Element root = document.getRootElement();
            //4.获取根节点的namespace属性取值
            String namespace = root.attributeValue("namespace");//是组成map中key的部分
            //5.获取所有的select节点
            List<Element> selectElements = root.selectNodes("//select");
            //6.遍历select节点集合
            for(Element selectElement : selectElements){
                //取出id属性的值      组成mappers中key的部分
                String id = selectElement.attributeValue("id");
                //取出resultType属性的值  组成map中value的部分
                String resultType = selectElement.attributeValue("resultType");
                //取出文本内容            组成map中value的部分
                String queryString = selectElement.getText();
                //创建Key
                String key = namespace+"."+id;
                //创建Value
                Mapper mapper = new Mapper();
                mapper.setQueryString(queryString);
                mapper.setResultType(resultType);
                //把key和value存入mappers中
                mappers.put(key,mapper);
            }
            return mappers;
        }catch(Exception e){
            throw new RuntimeException(e);
        }finally{
            in.close();
        }
    }
```

loadMapperAnnotation（注解）

```java
private static Map<String,Mapper> loadMapperAnnotation(String daoClassPath)throws Exception{

        Map<String,Mapper> mappers = new HashMap<String, Mapper>();

        Class daoClass = Class.forName(daoClassPath);

        Method[] methods = daoClass.getMethods();

        for(Method method : methods){
            //取出每一个方法，判断是否有select注解
            boolean isAnnotated = method.isAnnotationPresent(Select.class);
            if(isAnnotated){
                //创建Mapper对象
                Mapper mapper = new Mapper();
                //取出注解的value属性值
                Select selectAnno = method.getAnnotation(Select.class);
                String queryString = selectAnno.value();
                mapper.setQueryString(queryString);
                //获取当前方法的返回值，还要求必须带有泛型信息
                Type type = method.getGenericReturnType();//List<User>
                //判断type是不是泛型
                if(type instanceof ParameterizedType){
                    //强转
                    ParameterizedType ptype = (ParameterizedType)type;
                    //得到参数化类型中的实际类型参数
                    Type[] types = ptype.getActualTypeArguments();
                    //取出第一个
                    Class domainClass = (Class)types[0];
                    //获取domainClass的类名
                    String resultType = domainClass.getName();
                    //给Mapper赋值
                    mapper.setResultType(resultType);
                }
                else{
                    mapper.setResultType(type.getTypeName());
                }
                //组装key的信息
                //获取方法的名称
                String methodName = method.getName();
                String className = method.getDeclaringClass().getName();
                String key = className+"."+methodName;
                //给map赋值
                mappers.put(key,mapper);
            }
        }
        return mappers;
    }
```
完成以上的部分，我们已经将配置文件（注解）中的数据存储到Configuration对象
接下来我们只需要对Configuration对象进行处理，该处理需要借助另外一个类进行，获得数据库连接并且对接口方法进行动态代理增强。

Mybatis中是通过SqlSession#getMapper()方法JDK动态代理来实现的

```java
public <T> T getMapper(Class<T> daoInterfaceClass) {
        return (T) Proxy.newProxyInstance(daoInterfaceClass.getClassLoader(),
                new Class[]{daoInterfaceClass},new MapperProxy(cfg.getMappers(),connection));
    }
```

代理调用处理器
```java
public class MapperProxy implements InvocationHandler {

    private Map<String,Mapper> mappers;
    private Connection conn;

    public MapperProxy(Map<String,Mapper> mappers,Connection conn){
        this.mappers = mappers;
        this.conn = conn;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //1.获取方法名
        String methodName = method.getName();
        //2.获取方法所在类的名称
        String className = method.getDeclaringClass().getName();
        //3.组合key
        String key = className+"."+methodName;
        //4.获取mappers中的Mapper对象
        Mapper mapper = mappers.get(key);
        //5.判断是否有mapper
        if(mapper == null){
            throw new IllegalArgumentException("传入的参数有误");
        }
        //6.调用工具类执行查询所有
        return new Executor().selectList(mapper, args, conn);
    }
}
```
代理通知类
```java
public class Executor {

    public <E> List<E> selectList(Mapper mapper, Object[] args, Connection conn) {
        PreparedStatement pstm = null;
        ResultSet rs = null;
        try {
            //1.取出mapper中的数据
            String queryString = mapper.getQueryString();//select * from user
            String resultType = mapper.getResultType();//com.itheima.domain.User
            Class domainClass = Class.forName(resultType);
            //2.获取PreparedStatement对象
            pstm = conn.prepareStatement(queryString);
            //为sql语句注入参数
            if(args != null){
                for(int i = 0; i<args.length; i++){
                    pstm.setObject(i+1,args[i]);
                }
            }
            else{
                System.out.println("参数为空");
            }
            //3.执行SQL语句，获取结果集
            rs = pstm.executeQuery();
            //4.封装结果集
            List<E> list = new ArrayList<E>();//定义返回值
            while(rs.next()) {
                //实例化要封装的实体类对象
                E obj = (E)domainClass.newInstance();

                //取出结果集的元信息：ResultSetMetaData
                ResultSetMetaData rsmd = rs.getMetaData();
                //取出总列数
                int columnCount = rsmd.getColumnCount();
                //遍历总列数
                for (int i = 1; i <= columnCount; i++) {
                    //获取每列的名称，列名的序号是从1开始的
                    String columnName = rsmd.getColumnName(i);
                    //根据得到列名，获取每列的值
                    Object columnValue = rs.getObject(columnName);
                    //给obj赋值：使用Java内省机制（借助PropertyDescriptor实现属性的封装）
                    PropertyDescriptor pd = new PropertyDescriptor(columnName,domainClass);//要求：实体类的属性和数据库表的列名保持一种
                    //获取它的写入方法
                    Method writeMethod = pd.getWriteMethod();
                    //把获取的列的值，给对象赋值
                    writeMethod.invoke(obj,columnValue);
                }
                //把赋好值的对象加入到集合中
                list.add(obj);
            }
            return list;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            release(pstm,rs);
        }
    }


    private void release(PreparedStatement pstm,ResultSet rs){
        if(rs != null){
            try {
                rs.close();
            }catch(Exception e){
                e.printStackTrace();
            }
        }

        if(pstm != null){
            try {
                pstm.close();
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }
}
```
通过以上的部分，我们已经将配置的数据进行处理，并且对接口的方法进行动态代理增强，接下来我们就可以通过代理对象来完成对数据库的各种操作

```java
public class MybatisTest {
    public static void main(String[] args)throws Exception {
        //1.读取配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2.创建SqlSessionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //3.使用工厂生产SqlSession对象
        SqlSession session = factory.openSession();
        //4.使用SqlSession创建Dao接口的代理对象
        IUserDao userDao = session.getMapper(IUserDao.class);
        //5.使用代理对象执行方法
        List<User> users = userDao.findUserByName("Mark");
        for(User user : users){
            System.out.println(user);
        }
        //6.释放资源
        session.close();
        in.close();
    }
}
```
运行结果：

```java
User{id=1, username='Mark', birthday=2021-10-14, sex='M', address='wh'}
```
实际上，以上的代码只实现了最基础的MyBatis，当查询语句变得复杂时，我们还需要着眼于Select#parameterType属性、@Param注解等等
