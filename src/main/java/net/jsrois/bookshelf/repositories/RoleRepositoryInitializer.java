package net.jsrois.bookshelf.repositories;

import net.jsrois.bookshelf.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
public class RoleRepositoryInitializer {

    private RoleRepository roleRepository;

    @Autowired
    public RoleRepositoryInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void addAvailableRoles(){
        if (!roleRepository.findAll().isEmpty()) {
            return;
        }

        List<Role> roles = List.of(
                new Role(1, Role.RoleName.ROLE_ADMIN),
                new Role(2, Role.RoleName.ROLE_MODERATOR),
                new Role(3, Role.RoleName.ROLE_USER)
        );

        roleRepository.saveAll(roles);
    }
}
