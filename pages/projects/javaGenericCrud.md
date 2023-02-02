---
layout: post
author: k0d14k
---

Github : <a href="https://github.com/lucapuzzoni/GenericCRUD">Here</a>

## Configuration istructions
You can use this project to implement automatically your CRUD methods.

You just have to create a **SpringBoot Application project** from [here](https://start.spring.io/) using **Maven** with all the following dependencies:

```xml

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>com.mysql</groupId>
			<artifactId>mysql-connector-j</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>
```

And then copy the `it.lucapuzzoni.crud` package in your `src/main/java` directory.

## Usage Istructions
To use my classes you must extend them. With an example it should be clear.

### Entity
```Java
@Entity @Table(name = 'yourTable')
public class YourEntity extends CrudModel<YourEntity>{
    // You'll not need to add the @Id field 
    
    // Add all columns you want using JPA notations
    
    /**
     Remember to implement the absorbe method because is 
     the method will be called by the update fuction
     */
}
```

### Repository
```Java
@Repository
public interface YourRepository extends CrudRepository<YourEntity>{
    // Your Entity should extend CrudModel
}
```

### Service
```Java
@Service
public interface YourService extends CrudService<YourEntity>{}


@Service
public class YourServiceImpl extends CrudServiceImpl<YourEntity>{}
```

### Controller
```Java
@Controller
public class YourController extends CrudController<YourEntity>{}
```

## Conclusions
If you like this project put a Star and Join me to update it otherwise please, explain to me what you didn't like opening an issue and discussing it with me.