package cc.mrbird.quartz.dao;


import cc.mrbird.quartz.domain.Job;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.util.List;

public interface JobMapper extends BaseMapper<Job> {

	List<Job> queryList();
}
