package cc.mrbird.dao.system;

import cc.mrbird.domain.system.Role;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper extends BaseMapper<Role> {

	List<Role> findUserRole(@Param("userName") String userName);

}
