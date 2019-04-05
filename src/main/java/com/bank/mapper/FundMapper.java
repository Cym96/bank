package com.bank.mapper;

import com.bank.domain.Fund;
import java.util.*;
import org.apache.ibatis.annotations.*;
@Mapper
public interface FundMapper {
    /**
     *
     * @param startPage
     * @param pageSize
     * @return
     */
    List<Fund> findAllByPage(Integer startPage, Integer endPage);
    /**
     *
     * @param funId
     * @return
     */
    List<Fund> findBymangerId(Integer funId);

    /**
     *
     * @return
     */
    List<Fund> findAll();

    /**
     *
     * @param name
     * @return
     */
    Fund findByName(String name);

    /**
     *
     * @return
     */
    Integer countAll();

    /**
     *
     * @param fundId
     * @return
     */
    Fund findById(Integer fundId);

    /**
     *
     * @param fundId
     * @return
     */
    int deleteByPrimaryKey(Integer fundId);

    /**
     *
     * @param record
     * @return
     */
    int insert(Fund record);

    /**
     *
     * @param record
     * @return
     */
    int insertSelective(Fund record);

    /**
     *
     * @param fundId
     * @return
     */
    Fund selectByPrimaryKey(Integer fundId);

    /**
     *
     * @param record
     * @return
     */
    int updateByPrimaryKeySelective(Fund record);

    /**
     *
     * @param record
     * @return
     */
    int updateByPrimaryKey(Fund record);
}